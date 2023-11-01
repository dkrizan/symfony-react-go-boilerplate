import { gql } from '@apollo/client';

export const TIMEZONES = gql`
    query timezones {
        timezones
    }
`;
