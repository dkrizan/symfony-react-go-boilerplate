<?php

namespace Test\Helper;

use Codeception\Lib\Connector\Symfony as SymfonyClient;
class GraphqlClient
{

    private string $schema;

    private string $token;

    private SymfonyClient $client;

    public function __construct(SymfonyClient $client, string $schema, ?string $token = null)
    {
        $this->client = $client;
        $this->schema = $schema;
        $this->token = $token;
    }

    public function query(string $query, array $variables = []): array
    {
        $data = ['query' => $query, 'variables' => $variables];
        $headers = [
            'Content-Type' => 'application/json',
            'User-Agent' => 'Symfony GraphQL client'
        ];
        if (null !== $this->token) {
            $this->client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $this->token));
        }

        $this->client->request('POST', 'http://localhost/graphql/' . $this->schema, $data, [], $headers);
        $response = json_decode($this->client->getResponse()->getContent(), true);
        if (isset($response['errors'])) {
            throw new \Exception($response['errors'][0]['message']);
        }
        return array_shift($response['data']);
    }

}