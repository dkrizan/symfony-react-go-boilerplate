<?php
namespace Test\Functional\Auth;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Test\Helper\Functional;
use Test\Helper\FunctionalTester;

class AuthCest
{

    public function testLogin(FunctionalTester $i)
    {
        $client = $i->initSymfonyClient();
        $user = new User();
        $user->setLogin(Functional::TESTER_LOGIN);
        /** @var UserPasswordHasherInterface $encoder */
        $encoder = $i->grabService(UserPasswordHasherInterface::class);
        $user->setPassword($encoder->hashPassword($user, Functional::TESTER_PASSWORD));
        $i->haveInRepository($user);
        $client->request('POST', '/login', [], [],
            ['CONTENT_TYPE' => 'application/json'],
            json_encode(['username' => Functional::TESTER_LOGIN, 'password' => Functional::TESTER_PASSWORD])
        );
        $response = json_decode($client->getResponse()->getContent(), true);
        $i->assertArrayHasKey('token', $response);
    }
}
