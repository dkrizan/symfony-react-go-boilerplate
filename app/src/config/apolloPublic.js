import {ApolloClient, InMemoryCache, createHttpLink, from} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import {Alerts} from "../components/Alerts/Alerts";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_PUBLIC_API_URL
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        Alerts.error('Ups, something is broken. Try again later.');
    }
});

export const apollo = new ApolloClient({
    link: from([
        errorLink, // include the new error link in the ApolloClient
        httpLink
    ]),
    cache: cache,
});
