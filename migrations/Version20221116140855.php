<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20221116140855 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Adds tables for Monitor and Event entities, Project\'s `url` attribute and additional User attributes';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE "user" ADD ip VARCHAR(15) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD country VARCHAR(2) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD time_zone VARCHAR(64) DEFAULT \'UTC\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE "user" DROP ip');
        $this->addSql('ALTER TABLE "user" DROP country');
        $this->addSql('ALTER TABLE "user" DROP time_zone');
    }
}
