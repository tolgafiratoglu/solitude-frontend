import config from 'react-global-configuration';

config.set(
    {
        apiUrl: "http://0.0.0.0:8000",
        apiRequests: {
            login: "/api/token/",
            refresh: "/api/token/refresh/",
            currentUser: "/api/current-user",
            clusterInfo: "/api/cluster/:clusterId",
            clusterList: "/api/clusters",
            clusterSaveTopic: "/api/cluster/:clusterId/topic/save",
            brokerTopics: "/api/cluster/:clusterId/topics",
            brokerTopic: "/api/cluster/:clusterId/topic/:topic",
            clusterBrokers: "/api/cluster/:clusterId/brokers",
            addPartition: "/api/cluster/:clusterId/:topic/partition/create"
        }
    }
);            

export const apiConfig = config;