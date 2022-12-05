import axios from "axios";
import {apiConfig} from "../config/api";
import ServiceHelper from "../helpers/ServiceHelper";

export const clusterService = () => {

    let jwtConfig = ServiceHelper.getPrivateConfig()
    let apiUrl = apiConfig.get('apiUrl') + apiConfig.get('apiRequests.clusterList')

    let response = axios.get(
        apiUrl,
        jwtConfig
    ).then(
        (response) => {
            return response
        }
    ).catch(
        (response) => {
            return {'status': 'error', 'error': response}
        }
    );

    return response;
}    

export const clusterTopicsService = (clusterId) => {

    let jwtConfig = ServiceHelper.getPrivateConfig()
    let apiUrl = apiConfig.get('apiUrl') + apiConfig.get('apiRequests.brokerTopics')
    apiUrl = apiUrl.replace(':clusterId', clusterId)

    let response = axios.get(
        apiUrl,
        jwtConfig
    ).then(
        (response) => {
            return response
        }
    ).catch(
        (response) => {
            return {'status': 'error', 'error': response}
        }
    );

    return response;
}    

export const clusterInfoService = (clusterId) => {

    let jwtConfig = ServiceHelper.getPrivateConfig()
    let apiUrl = apiConfig.get('apiUrl') + apiConfig.get('apiRequests.clusterInfo')
    apiUrl = apiUrl.replace(':clusterId', clusterId)

    let response = axios.get(
        apiUrl,
        jwtConfig
    ).then(
        (response) => {
            return response
        }
    ).catch(
        (response) => {
            return {'status': 'error', 'error': response}
        }
    );

    return response;
}   

export const clusterBrokersService = (clusterId) => {

    let jwtConfig = ServiceHelper.getPrivateConfig()
    let apiUrl = apiConfig.get('apiUrl') + apiConfig.get('apiRequests.clusterBrokers')
    apiUrl = apiUrl.replace(':clusterId', clusterId)

    let response = axios.get(
        apiUrl,
        jwtConfig
    ).then(
        (response) => {
            return response
        }
    ).catch(
        (response) => {
            return {'status': 'error', 'error': response}
        }
    );

    return response;
}

export const clusterTopicService = (clusterId, title, noPartitions, replicationFactor) => {
    let headers = ServiceHelper.getPrivateConfig()
    let apiUrl = apiConfig.get('apiUrl') + apiConfig.get('apiRequests.clusterSaveTopic')
    apiUrl = apiUrl.replace(':clusterId', clusterId)

    console.log('apiUrl', headers)

    let response = axios.post(
        apiUrl,
        {
            topic_title: title,
            topic_partition_number: parseInt(noPartitions),
            topic_replication_factor: parseInt(replicationFactor)
        },
        headers
    ).then(
        (response) => {
            console.log(response)
            return response
        }
    ).catch(
        (response) => {
            return {'status': 'error', 'error': response}
        }
    );

    return response;
}