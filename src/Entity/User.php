<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Uid\UuidV6;
use Overblog\GraphQLBundle\Annotation as GQL;

#[ORM\Entity(repositoryClass:UserRepository::class)]
#[ORM\Table(name:"`user`")]
#[GQL\Type]
class User implements UserInterface, PasswordAuthenticatedUserInterface {

    const DEFAULT_TIMEZONE = "UTC";

    #[ORM\Id]
    #[ORM\Column(type:"uuid", unique:true)]
    #[ORM\GeneratedValue(strategy:"CUSTOM")]
    #[ORM\CustomIdGenerator(class:UuidGenerator::class)]
    private UuidV6 $id;

    # User full name
    #[ORM\Column(type:"string", length:255, nullable:true)]
    #[GQL\Field(type: "String!")]
    private string $name;

    # User login
    #[ORM\Column(type:"string", length:255, unique:true)]
    #[GQL\Field(type: "String!")]
    private string $login;

    # User password
    #[ORM\Column(type:"string", length:255)]
    private string $password;

    #[ORM\Column(type: "string", length: 15, nullable: true)]
    private string $ip;

    #[ORM\Column(type: "string", length: 2, nullable: true)]
    private string $country;

    #[ORM\Column(type: "string", length: 64, options: ["default" => self::DEFAULT_TIMEZONE])]
    #[GQL\Field]
    private string $timeZone = self::DEFAULT_TIMEZONE;
    
    # User's projects
    #[ORM\OneToMany(mappedBy: "user", targetEntity: "App\Entity\Project")]
    #[GQL\Field(type: "[Project!]")]
    # @var Project[]
    private Collection|array $projects;

    public function getId(): UuidV6
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): self
    {
        $this->login = $login;

        return $this;
    }

    public function getPassword(): ?string {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function getRoles() : array
    {
        return ['ROLE_USER'];
    }

    public function getSalt()
    {
        return null;
    }

    public function getUsername(): string
    {
        return $this->login;
    }

    public function eraseCredentials()
    {

    }

    public function getUserIdentifier(): string
    {
        return $this->getLogin();
    }

    public function getTimeZone(): string
    {
        return $this->timeZone;
    }

    public function setTimeZone(string $timeZone): void
    {
        $this->timeZone = $timeZone;
    }

    public function getIp(): string
    {
        return $this->ip;
    }

    public function setIp(string $ip): void
    {
        $this->ip = $ip;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function setCountry(string $country): void
    {
        $this->country = $country;
    }
}
