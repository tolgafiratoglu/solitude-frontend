import axios from "axios";
import {customConfig} from "../config/config";
import ServiceHelper from "../helpers/ServiceHelper";

export const currentUserService = () => {

    let config = ServiceHelper.getPrivateConfig()

    return axios.get(
        customConfig.get('apiUrl') + customConfig.get('apiRequests.currentUser'),
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