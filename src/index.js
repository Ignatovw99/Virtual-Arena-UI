import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Auth0Provider } from "@auth0/auth0-react";

import { UserProvider } from "./contexts/UserContext";
import App from './App';

import authConfig from "./config/authConfig";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Auth0Provider
                domain={authConfig.AUTH0_DOMAIN}
                clientId={authConfig.APP_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience: authConfig.TOKEN_AUDIENCE
                }}
                cacheLocation={authConfig.AUTH_STORAGE_LOCATION}
                useRefreshTokens={true}
                useRefreshTokensFallback={true}
            >
                <UserProvider>
                    <App />
                </UserProvider>
            </Auth0Provider>
        </BrowserRouter>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
