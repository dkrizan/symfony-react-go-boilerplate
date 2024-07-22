<?php

namespace App\Graphql\Public;

use App\Entity\User;
use App\Graphql\Api\BaseObject;
use App\Graphql\Api\Result;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

class AuthMutation extends BaseObject implements MutationInterface, AliasedInterface {

    use ResetPasswordControllerTrait;

    public function __construct(
        EntityManagerInterface $em,
        Security $security,
        private readonly ResetPasswordHelperInterface $resetPasswordHelper,
        private readonly MailerInterface $mailer,
        private readonly UserPasswordHasherInterface $passwordHasher,
        #[Autowire(env: 'NO_REPLY_EMAIL')] private readonly string $noReplyEmail
    ) {
        parent::__construct($security, $em);
    }

    /**
     * Mutation - requestPasswordReset
     *
     * @param string $email
     * @return array
     */
    public function requestPasswordReset(string $email) : array {
        $user = $this->em->getRepository(User::class)->findOneBy([
            'login' => $email,
        ]);

        if (!$user) {
            return Result::fail('No user associated with this email found.');
        }

        $resetToken = $this->resetPasswordHelper->generateResetToken($user);

        $email = (new TemplatedEmail())
            ->from(new Address($this->noReplyEmail, 'Support'))
            ->to($user->getLogin())
            ->subject('Your password reset request')
            ->htmlTemplate('reset-password/email.html.twig')
            ->context([
                'resetToken' => $resetToken,
            ])
        ;

        $this->mailer->send($email);

        // Store the token object in session for retrieval in check-email route.
        $this->setTokenObjectInSession($resetToken);

        return Result::success();
    }

    public function resetPassword(string $token, string $password) : array {
        try {
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return Result::fail(ResetPasswordExceptionInterface::MESSAGE_PROBLEM_VALIDATE);
        }

        // A password reset token should be used only once, remove it.
        $this->resetPasswordHelper->removeResetRequest($token);

        // Encode(hash) the plain password, and set it.
        $encodedPassword = $this->passwordHasher->hashPassword(
            $user,
            $password
        );

        $user->setPassword($encodedPassword);
        $this->em->flush();

        return Result::success();
    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases() : array {
        return [
            'requestPasswordReset' => 'requestPasswordReset',
            'resetPassword' => 'resetPassword'
        ];
    }
}