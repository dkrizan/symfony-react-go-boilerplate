<?php
/**
 * Created by PhpStorm.
 * @author Daniel Krizan <danyelkrizan@gmail.com>
 * Date: 13.02.21 21:03
 */

namespace App\Graphql\Api\Mutation;


use App\Entity\Project;
use App\Graphql\Api\BaseObject;
use App\Graphql\Api\Result;
use App\Voter\ProjectVoter;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use GraphQL\Error\UserError;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Overblog\GraphQLBundle\Annotation AS GQL;
use Symfony\Bundle\SecurityBundle\Security;

#[GQL\Provider(targetMutationTypes: "RootMutation")]
class ProjectMutation extends BaseObject implements MutationInterface {

    private EntityRepository $projectRepository;

    public function __construct(
        EntityManagerInterface $em,
        Security $security
    ) {
        parent::__construct($security, $em);
        $this->projectRepository = $em->getRepository(Project::class);
    }

    /**
     * Mutation - createProject
     *
     * @param array $input
     * @return Project
     */
    #[GQL\Mutation(name: "createProject", type: "Project!")]
    #[GQL\Arg(name: "input", type: "CreateProjectInput!")]
    public function create(array $input) : Project {
        $project = new Project();
        $project->setName($input['name']);
        $project->setDescription($input['description']);
        $project->setUser($this->getUser());
        $this->em->persist($project);
        $this->em->flush();

        return $project;
    }

    /**
     * Mutation - updateProject
     *
     * @param array $input
     * @return Project
     */
    #[GQL\Mutation(name: "updateProject", type: "Project!")]
    #[GQL\Arg(name: "input", type: "UpdateProjectInput!")]
    public function update(array $input) : Project {
        /** @var Project $project */
        $project = $this->projectRepository->find($input['id']);
        if (!$project) {
            throw new UserError('Project not found.');
        }
        $this->denyAccessUnlessGranted(ProjectVoter::UPDATE, $project);
        if (array_key_exists('name', $input)) {
            $project->setName($input['name']);
        }
        if (array_key_exists('description', $input)) {
            $project->setDescription($input['description']);
        }
        $this->em->flush();

        return $project;
    }

    /**
     * Mutation - deleteProject
     *
     * @param string $id
     * @return string[]
     */
    #[GQL\Mutation(name: "deleteProject", type: "MutationResult!")]
    #[GQL\Arg(name: "id", type: "ID!")]
    public function delete(string $id) : array {
        /** @var Project $project */
        $project = $this->projectRepository->find($id);
        if (!$project) {
            throw new UserError('Project not found.');
        }
        $this->denyAccessUnlessGranted(ProjectVoter::UPDATE, $project);

        $this->em->remove($project);
        $this->em->flush();

        return Result::success();
    }
}