<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Component\Uid\UuidV6;
use Overblog\GraphQLBundle\Annotation AS GQL;

#[ORM\Entity]
#[ORM\Table(name:"project")]
#[GQL\Type]
class Project {

    #[ORM\Id]
    #[ORM\Column(type:"uuid", unique:true)]
    #[ORM\GeneratedValue(strategy:"CUSTOM")]
    #[ORM\CustomIdGenerator(class:UuidGenerator::class)]
    #[GQL\Field(name: "id", type: "String!")]
    private UuidV6 $id;

    # Project name
    #[ORM\Column(type:"string", length: 255)]
    #[GQL\Field(type: "String!")]
    private string $name;

    # Project description
    #[ORM\Column(type:"text", nullable: true)]
    #[GQL\Field(type: "String")]
    private string $description;

    #User of project
    #[ORM\ManyToOne(targetEntity:"App\Entity\User", inversedBy:"projects")]
    #[ORM\JoinColumn(name:"user_id", referencedColumnName:"id", nullable:false)]
    private User $user;

    public function getId(): UuidV6
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}
