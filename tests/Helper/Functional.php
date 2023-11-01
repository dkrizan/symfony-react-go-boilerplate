<?php
namespace Test\Helper;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

use App\Entity\User;
use Codeception\Module;
use Codeception\Module\Doctrine2;
use Codeception\Module\Symfony;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class Functional extends Module
{

    const TESTER_LOGIN = 'tester';
    const TESTER_PASSWORD = 'password';

    protected \Codeception\Lib\Connector\Symfony $client;

    private User $testUser;

    public function getGraphqlClient(string $schema = "api"): GraphqlClient
    {
        $client = $this->initSymfonyClient();
        $token = $this->login();
        return new GraphqlClient($client, $schema, $token);
    }

    public function initSymfonyClient(): \Codeception\Lib\Connector\Symfony
    {
        /** @var Symfony $symfony */
        $symfony = $this->getModule('Symfony');
        /** @var \Codeception\Lib\Connector\Symfony $client */
        $client = $symfony->client;
        $client->rebootKernel();
        return $client;
    }

    private function login(): string
    {
        /** @var Doctrine2 $doctrine */
        $doctrine = $this->getModule('Doctrine2');
        $user = new User();
        $user->setLogin(self::TESTER_LOGIN);
        $user->setPassword(self::TESTER_PASSWORD);
        $userUuid = $doctrine->haveInRepository($user);
        $this->testUser = $doctrine->grabEntityFromRepository(User::class, ['id' => $userUuid]);

        /** @var Symfony $symfony */
        $symfony = $this->getModule('Symfony');

        /** @var JWTTokenManagerInterface $tokenManager */
        $tokenManager = $symfony->_getContainer()->get('lexik_jwt_authentication.jwt_manager');
        return $tokenManager->create($user);
    }

    public function getTestUser(): User
    {
        if ($this->testUser === null) {
            throw new \RuntimeException('Test user not initialized. Method `getGraphqlClient()` must be called before !');
        }
        return $this->testUser;
    }

}
