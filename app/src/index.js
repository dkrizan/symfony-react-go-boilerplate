import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {App} from './App';
import reportWebVitals from './reportWebVitals';
// import { apollo } from 'config/apollo';
// import { ApolloProvider } from "@apollo/client";
import { store } from './store';
import './index.css';
import {AlertsProvider} from "./context/Alerts";
import {AppSettingsProvider} from "./context/AppSettings";
import "helpers/timeAgo"

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    integrations: [new BrowserTracing()],
    environment: process.env.REACT_APP_SENTRY_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppSettingsProvider>
            <AlertsProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AlertsProvider>
        </AppSettingsProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
