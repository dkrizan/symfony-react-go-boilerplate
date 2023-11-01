import {gql} from "@apollo/client";

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            name
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation changePassword($input: ChangePasswordInput!) {
        changePassword(input: $input) {
            success
            message
            code
        }
    }
`