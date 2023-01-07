import axios from "axios";
import {apiConfig} from "../config/api";
import ServiceHelper from "../helpers/ServiceHelper";

import { redirect } from 'react-router-dom';

export const currentUserService = () => {

    let config = ServiceHelper.getPrivateConfig()

    return axios.get(
        apiConfig.get('apiUrl') + apiConfig.get('apiRequests.currentUser'),
        config
    ).then(
        (response) => {
            console.log('currentUserService', response)
            if(response.data.status == "success") {
                // Set JWT token:
                localStorage.setItem('userRole', response.data.data)
                return {'status': 'success', 'data': response.data.data}
            }else{
                return {'status': 'error', 'error': 'response'}
            }
        }
    ).catch(
        (response) => {
            return {'status': 'error', 'error': 'response'}
        }
    );

}

export const isLoggedIn = () => {
    console.log(localStorage.getItem("jwtToken"))
    return localStorage.getItem("jwtToken") ? true : redirect('/login');
}