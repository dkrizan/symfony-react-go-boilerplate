import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

import {fetchService, history} from 'helpers';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
    let tokenHP = Cookies.get("jwt_hp");
    let parsed;
    let expired = false;
    try {
         parsed = tokenHP ? parseTokenHP(tokenHP) : null;
    } catch (err) {
        expired = true;
    }
    // if token expired, return null
    if (expired || !parsed || parsed.exp < new Date().getTime() / 1000) {
        Cookies.remove("jwt_hp", { path: '/', domain: "." + process.env.REACT_APP_DOMAIN});
        return {
            user: null
        };
    }
    return {
        // initialize state from local storage to enable user to stay logged in
        user: {
            token: tokenHP,
            login: parsed?.login,
            expiration: parsed?.exp,
        },
        error: null
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        state.user = null;
        Cookies.remove("jwt_hp", { path: '/', domain: "." + process.env.REACT_APP_DOMAIN});
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;
    return {
        login: login(),
        signup: signup(),
        refreshToken: refreshToken()
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }) => await fetchService.post(`${baseUrl}/login`, { username, password }, true)
        );
    }

    function signup() {
        return createAsyncThunk(
            `${name}/signup`,
            async ({ username, password, fullName }) => await fetchService.post(`${baseUrl}/register`, { username, password, fullName }, true)
        );
    }

    function refreshToken() {
        return createAsyncThunk(
            `${name}/refreshToken`,
            async () => await fetchService.post(`${baseUrl}/graphql/api/refresh_token`)
        );
    }
}

function parseTokenHP(tokenHP) {
    return JSON.parse(atob(tokenHP.split('.')[1]));
}

function obtainToken(state) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    let tokenHP = Cookies.get("jwt_hp");
    let parsed = parseTokenHP(tokenHP);
    state.user = {
        token: tokenHP,
        login: parsed.login,
        expiration: parsed.exp
    };
}

function createExtraReducers() {
    return {
        ...login(),
        ...signup(),
        ...refreshToken()
    };

    function login() {
        var { pending, fulfilled, rejected } = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => obtainToken(state),
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }

    function signup() {
        var { pending, fulfilled, rejected } = extraActions.signup;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => obtainToken(state),
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }

    function refreshToken() {
        const {pending, fulfilled, rejected} = extraActions.refreshToken;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state) => obtainToken(state),
            [rejected]: () => {
                history.navigate('/login');
            }
        };
    }
}