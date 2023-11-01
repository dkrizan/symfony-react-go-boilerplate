import {gql} from "@apollo/client";

export const PROJECT = gql`
    query($id: ID!) {
        project(id: $id) {
            id
            name
            description
        }
    }
`
