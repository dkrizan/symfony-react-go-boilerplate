<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20210214115836 extends AbstractMigration
{
    public function getDescription() : string {
        return 'Creates user and project tables';
    }

    public function up(Schema $schema) : void {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE project (id UUID NOT NULL, user_id UUID NOT NULL, name VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2FB3D0EEA76ED395 ON project (user_id)');
        $this->addSql('COMMENT ON COLUMN project.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN project.user_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE "user" (id UUID NOT NULL, name VARCHAR(255) DEFAULT NULL, login VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649AA08CB10 ON "user" (login)');
        $this->addSql('COMMENT ON COLUMN "user".id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EEA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void {
        $this->addSql('ALTER TABLE project DROP CONSTRAINT FK_2FB3D0EEA76ED395');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE "user"');
    }
}
