import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
    mutation createProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            id
            name
            description
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            success
        }
    }
`