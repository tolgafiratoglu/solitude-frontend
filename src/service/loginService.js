import axios from "axios";

import { apiConfig } from '../config/api';

export const loginService = (username, password) => {
        return axios.post(
            apiConfig.get('apiUrl') + apiConfig.get('apiRequests.login'), 
            {
                username: username,
                password: password
            }
        ).then(
            (response) => {
                if(response.data.access) {
                    // Set JWT token:
                    localStorage.setItem('jwtToken', response.data.access)
                    localStorage.setItem('refreshToken', response.data.refresh)
                    return {'status': 'success', 'data': {'token': response.data.access}}
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