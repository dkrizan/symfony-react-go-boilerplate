import { gql } from '@apollo/client';

export const ME = gql`
    query me {
        me {
            name
            login
            timeZone
        }
    }
`;

export const PROJECTS = gql`
    query projects {
        projects {
            id
            name
            description
        }
    }
`;