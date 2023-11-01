<?php

namespace App\Graphql\Api;

use JetBrains\PhpStorm\ArrayShape;

class Result
{

    #[ArrayShape(['success' => "bool"])]
    public static function success(): array
    {
        return ['success' => true];
    }

    #[ArrayShape(['success' => "false", 'message' => "null|string", 'code' => "null|string"])]
    public static function fail(?string $message = null, ?string $code = ""): array
    {
        return ['success' => false, 'message' => $message, 'code' => $code];
    }

}