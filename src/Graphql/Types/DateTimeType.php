<?php

namespace App\Graphql\Types;

use GraphQL\Language\AST\Node;
use Overblog\GraphQLBundle\Annotation as GQL;

#[GQL\Scalar(name:"DateTime")]
class DateTimeType
{

    public static function serialize(\DateTime $value): string
    {
        return $value->format(\DateTime::ATOM);
    }

    public static function parseValue($value): \DateTIme
    {
        return new \DateTime($value);
    }

    public static function parseLiteral(Node $valueNode): \DateTIme
    {
        return new \DateTime($valueNode->value);
    }
}