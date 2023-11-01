<?php

namespace App\Graphql\Api\Resolver;

use App\Entity\Project;
use App\Graphql\Api\BaseObject;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Resolver\QueryInterface;
use Overblog\GraphQLBundle\Annotation AS GQL;

#[GQL\Provider(targetQueryTypes: "RootQuery")]
class Projects extends BaseObject implements QueryInterface
{

    #[GQL\Query(name: "project", type: "Project", resolve: "query('App\\\Graphql\\\Api\\\Resolver\\\Projects::project', args['id'], info)")]
    #[GQL\Arg(name: "id", type: "ID!")]
    public function project(string $id, ResolveInfo $info): Project
    {
        $repo = $this->em->getRepository(Project::class);
        $qb = $repo->createQueryBuilder('p')
            ->where('p.id = :id')
            ->setParameter('id', $id);
        return $qb->getQuery()->getOneOrNullResult();
    }
}