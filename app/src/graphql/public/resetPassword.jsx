import { gql } from '@apollo/client';

export const CHECK_RESET_TOKEN = gql`
    query checkPasswordResetToken($token: String!) {
        checkPasswordResetToken(token: $token)
    }
`;

export const REQUEST_PASSWORD_RESET = gql`
    mutation requestPasswordReset($email: String!) {
        requestPasswordReset(email: $email) {
            success
            message
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation resetPassword($token: String!, $password: String!) {
        resetPassword(token: $token, password: $password) {
            success
            message
        }
    }
`;