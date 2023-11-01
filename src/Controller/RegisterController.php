<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use GeoIp2\Database\Reader;
use GeoIp2\Exception\AddressNotFoundException;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use MaxMind\Db\Reader\InvalidDatabaseException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use function Sentry\captureException;

class RegisterController extends AbstractController
{

    #[Route('/register', name: 'register', format: 'json')]
    public function register(
        Request $request,
        UserRepository $users,
        UserPasswordHasherInterface $encoder,
        EntityManagerInterface $em,
        AuthenticationSuccessHandler $authHandler,
        #[Autowire('@geoip2.database.default_reader')] Reader $countryReader,
        #[Autowire('@geoip2.database.city_reader')] Reader $cityReader,
    ): Response
    {
        $fullName = $request->get('fullName');
        $login = $request->get('username');
        $password = $request->get('password');
        $user = $users->findOneBy(['login' => $login]);

        if ($user) {
            return new JsonResponse(['message' => 'User with this login already exists !'], 400);
        }

        $user = new User();
        $user->setLogin($login);
        $user->setPassword($encoder->hashPassword($user, $password));
        $user->setName($fullName);
        $user->setIp($request->getClientIp());
        try {
            $user->setCountry($countryReader->country($request->getClientIp())->country->isoCode);
        } catch (AddressNotFoundException $e) {
            captureException($e);
        }
        try {
            $user->setTimeZone($cityReader->city($request->getClientIp())->location->timeZone);
        } catch (AddressNotFoundException $e) {
            captureException($e);
        }
        $em->persist($user);
        $em->flush();

        return $authHandler->handleAuthenticationSuccess($user);
    }
}
