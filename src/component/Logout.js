import React, { useEffect } from 'react';
import { get } from 'react-global-configuration';

import { redirect, Navigate } from 'react-router-dom';
 
const Logout = (props) => {

    const redirectToLogin = async () => {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('refreshToken')
    }

    useEffect(() => {
        redirectToLogin()
    }, []);

    return (<Navigate to="/login"></Navigate>)
}

export default Logout;