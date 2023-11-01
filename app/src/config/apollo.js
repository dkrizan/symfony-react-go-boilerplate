import {ApolloClient, createHttpLink, from, InMemoryCache, Observable} from '@apollo/client';
import {onError} from "@apollo/client/link/error";
import {Alerts} from "../components/Alerts/Alerts";
import {authActions, store} from "../store";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL,
    credentials: 'include'
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
        Alerts.error('Ups, something is broken. Try again later.');
    }
    if (networkError && networkError.response.status === 401) {
        // ignore 401 error for a refresh request
        return new Observable(
            (observer) => {
                (async () => {
                    try {
                        await store.dispatch(authActions.refreshToken());
                        // Retry the failed request
                        const subscriber = {
                            next: observer.next.bind(observer),
                            error: observer.error.bind(observer),
                            complete: observer.complete.bind(observer),
                        };

                        forward(operation).subscribe(subscriber);
                    } catch (err) {
                        observer.error(err);
                    }
                })();
            }
        );
    }
});

export const apollo = new ApolloClient({
    link: from([
        errorLink, // include the new error link in the ApolloClient
        httpLink
    ]),
    cache: cache,
});
