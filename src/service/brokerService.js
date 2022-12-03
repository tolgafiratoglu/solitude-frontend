import axios from "axios";
import {apiConfig} from "../config/api";
import ServiceHelper from "../helpers/ServiceHelper";

export const brokerTopicsService = (brokerId) => {

    let jwtConfig = ServiceHelper.getPrivateConfig()
    let apiUrl = apiConfig.get('apiUrl') + apiConfig.get('apiRequests.brokerTopics')
    apiUrl = apiUrl.replace(':brokerid', brokerId)

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