import React from 'react';

export default class ServiceHelper extends React.Component {

    static getPrivateConfig() {
        let authToken = localStorage.getItem('jwtToken');
        if(authToken != null){
            var config = {
                headers: {'Authorization': "Bearer " + authToken}
            };

            return config;
        } else {
            return false;
        }
    }
}