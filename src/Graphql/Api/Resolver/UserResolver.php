<?php
/**
 * Created by PhpStorm.
 * @author Daniel Krizan <danyelkrizan@gmail.com>
 * Date: 13.02.21 20:16
 */

namespace App\Graphql\Api\Resolver;


use App\Entity\Project;
use App\Entity\User;
use App\Graphql\Api\BaseObject;
use Doctrine\Common\Collections\Collection;
use Overblog\GraphQLBundle\Definition\Resolver\QueryInterface;
use Overblog\GraphQLBundle\Annotation AS GQL;

#[GQL\Provider(targetQueryTypes: "RootQuery")]
class UserResolver extends BaseObject implements QueryInterface
{

    #[GQL\Query(name: "me", type: "User")]
    public function user(): User
    {
        return $this->getUser();
    }

    #[GQL\Query(name: "projects", type: "[Project!]")]
    public function projects(): Collection|array
    {
        $repo = $this->em->getRepository(Project::class);
        $qb = $repo->createQueryBuilder('p')
            ->select('p')
            ->where('p.user = :user')
            ->setParameter('user', $this->getUser()->getId());

        return $qb->getQuery()->getResult();
    }

}