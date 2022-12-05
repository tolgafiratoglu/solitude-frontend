import axios from "axios";
import {apiConfig} from "../config/api";

import ServiceHelper from '../helpers/ServiceHelper'

export const tokenRefresh = (refreshToken) => {
        let jwtConfig = ServiceHelper.getPrivateConfig()

        return axios.post(
            apiConfig.get('apiUrl') + apiConfig.get('apiRequests.refresh'),
            {
                "refresh": refreshToken
            },
            jwtConfig
        ).then(
            (response) => {
                localStorage.setItem('jwtToken', response.data.access)
            }
        ).catch(
            (response) => {
                document.location = '/login'
            }
        );

}

export const tokenRefreshService = () => {
    let refreshToken = localStorage.getItem("refreshToken")

    if(typeof refreshToken != undefined){
        var refreshInterval = setInterval(
            function() {
                tokenRefresh(refreshToken)
            }, 15000
        );
    } else {
        document.location = '/login'
    }

}
