<?php

namespace App\Voter;

use App\Entity\Project;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ProjectVoter extends Voter
{

    const UPDATE = 'UPDATE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return $subject instanceof Project && in_array($attribute, [self::UPDATE]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var $subject Project */
        if ($attribute == self::UPDATE) {
            return $subject->getUser() === $token->getUser();
        }
        return false;
    }
}