<?php

namespace App\Graphql\Api;

use Overblog\GraphQLBundle\Annotation as GQL;

#[GQL\Type]
class RootMutation
{
    #[GQL\Field(type: "String")]
    public function dummy() : string
    {
        return "";
    }
}