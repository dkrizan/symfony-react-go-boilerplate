<?php

namespace App\Graphql\Api\Mutation;

use App\Entity\User;
use App\Graphql\Api\BaseObject;
use App\Graphql\Api\Result;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation AS GQL;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[GQL\Provider(targetMutationTypes: "RootMutation")]
class UserMutation extends BaseObject implements MutationInterface, AliasedInterface {

    public function __construct(
        EntityManagerInterface $em,
        Security $security,
        private readonly UserPasswordHasherInterface $encoder
    ) {
        parent::__construct($security, $em);
    }

    /**
     * Mutation - updateUser
     *
     * @param array $input
     * @return User
     */
    #[GQL\Mutation(name: "updateUser", type: "User")]
    #[GQL\Arg(name: "input", type: "UpdateUserInput!")]
    public function update(array $input) : User {
        $user = $this->getUser();

        if (array_key_exists('name', $input)) {
            $user->setName($input['name']);
        }
        $this->em->flush();

        return $user;
    }

    /**
     * Mutation - changePassword
     *
     * @param string $current
     * @param string $new
     * @return array
     */
    #[GQL\Mutation(name: "changePassword", type: "MutationResult!")]
    #[GQL\Arg(name: "input", type: "ChangePasswordInput!")]
    // @todo implement validation of input
    public function changePassword(array $input) : array {
        $current = $input['currentPassword'];
        $new = $input['newPassword'];
        $user = $this->getUser();

        if (!$this->encoder->isPasswordValid($user, $current)) {
            return Result::fail('Incorrect current password.', 'INVALID_PASSWORD');
        }

        $user->setPassword($this->encoder->hashPassword($user, $new));

        $this->em->flush();

        return Result::success();
    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases() : array {
        return [
            'changePassword' => 'changePassword',
        ];
    }
}