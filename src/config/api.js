import config from 'react-global-configuration';

config.set(
    {
        apiUrl: "http://0.0.0.0:8000",
        apiRequests: {
            login: "/api/token/",
            refresh: "/api/token/refresh/",
            currentUser: "/api/current-user",
            clusterList: "/api/clusters",
            brokerTopics: "/api/cluster/:clusterId/topics",
        }
    }
);            

export const apiConfig = config;