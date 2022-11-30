import config from 'react-global-configuration';

config.set(
    {
        apiUrl: "http://0.0.0.0:8000",
        apiRequests: {
            login: "/api/token/"
        }
    }
);            

export const apiConfig = config;