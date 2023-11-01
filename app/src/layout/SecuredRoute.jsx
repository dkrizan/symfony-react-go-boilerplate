import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from 'helpers';
import {Header} from "./index";
import {Alerts} from "../components/Alerts/Alerts";
import {ApolloProvider} from "@apollo/client";
import {apollo} from "../config/apollo";
import {authActions, store} from "../store";
import {useEffect, useState} from "react";

export function SecuredRoute() {
    const { user: authUser } = useSelector(x => x.auth);
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    async function refreshToken() {
        await store.dispatch(authActions.refreshToken());
    }
    useEffect(() => {
        if (!authUser) {
            refreshToken()
                .then(() => setLoading(false))
                .catch(() => setRedirect(true))
        } else {
            setLoading(false);
        }
    }, [authUser])

    if (loading) {
        return;
    }
    if (redirect) {
        return <Navigate to="/login" state={{from: history.location}}/>
    }

    // authorized so return child components
    return (
        <div className="h-full bg-gray-50 dark:bg-gray-800">
            <ApolloProvider client={apollo}>
                <Header />
                <main className="py-5">
                    <Outlet />
                </main>
                <Alerts/>
            </ApolloProvider>
        </div>
    );
}