<?php

namespace App\Graphql\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use GraphQL\Error\UserError;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\User\UserInterface;

class BaseObject extends AbstractController
{

    protected Security $security;

    protected EntityManagerInterface $em;

    public function __construct(Security $security, EntityManagerInterface $em) {
        $this->security = $security;
        $this->em = $em;
    }

    protected function getUser(): User|UserInterface
    {
        return $this->security->getUser();
    }

    protected function denyAccessUnlessGranted(mixed $attribute, mixed $subject = null, string $message = 'Access Denied.'): void
    {
        try {
            parent::denyAccessUnlessGranted($attribute, $subject, $message);
        } catch (AccessDeniedException $ex) {
            throw new UserError($message);
        }
    }

}