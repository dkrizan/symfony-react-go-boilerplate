<?php

namespace App\Graphql\Api\Resolver;
use Overblog\GraphQLBundle\Annotation AS GQL;
use Overblog\GraphQLBundle\Definition\Resolver\QueryInterface;

#[GQL\Provider(targetQueryTypes: "RootQuery")]
class FormResolver implements QueryInterface
{

    #[GQL\Query(name: "timezones", type: "[String!]")]
    public function getTimezones(): array
    {
        return \DateTimeZone::listIdentifiers();
    }

}