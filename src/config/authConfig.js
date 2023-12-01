const authConfig = {
    AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
    APP_CLIENT_ID: process.env.REACT_APP_VIRTUAL_ARENA_CLIENT_ID,
    TOKEN_AUDIENCE: "https://test.com",
    AUTH_STORAGE_LOCATION: "localstorage"
};

export default authConfig;
