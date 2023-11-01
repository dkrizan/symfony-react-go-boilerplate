<?php
/**
 * Created by PhpStorm.
 * @author Daniel Krizan <danyelkrizan@gmail.com>
 * Date: 14.02.21 17:33
 */

namespace Test\Functional\Api;

use Test\Helper\Functional;
use Test\Helper\FunctionalTester;


class UsersResolverCest {

    public function testCreateProject(FunctionalTester $i) {
        $client = $i->getGraphqlClient();
        $user = $i->getTestUser();
        $user->setName('Test name');
        $query = <<<'GRAPHQL'
            query {
                me {
                    login
                    name
                }
            }
            GRAPHQL;
        $data = $client->query($query);

        $i->assertSame(Functional::TESTER_LOGIN, $data['login']);
        $i->assertSame('Test name', $data['name']);
    }
}