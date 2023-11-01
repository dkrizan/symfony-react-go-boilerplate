<?php

namespace App\Graphql\Public;

use App\Graphql\Api\BaseObject;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\QueryInterface;
use Symfony\Bundle\SecurityBundle\Security;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

class AuthResolver extends BaseObject implements QueryInterface, AliasedInterface
{

    public function __construct(
        Security $security,
        EntityManagerInterface $em,
        private readonly ResetPasswordHelperInterface $resetPasswordHelper
    )
    {
        parent::__construct($security, $em);
    }

    public function checkPasswordResetToken(string $token): bool {
        try {
            $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return false;
        }
        return true;
    }

    public static function getAliases(): array
    {
        return [
            'checkPasswordResetToken' => 'checkPasswordResetToken'
        ];
    }
}