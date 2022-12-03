import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import {clusterService} from '../../service/clusterService'

const Sidebar = (props) => {
    const [clusterList, setClusterList] = React.useState([]);

    const getClusterList = () => {
        clusterService().then(
            (response) => {
                setClusterList(response.data)
            }
        )
    }

    useEffect(() => {
        getClusterList()
    }, []);

    return (
        <div className="sidebar-wrapper">
            <ul>
                {clusterList && clusterList.length > 0 ? clusterList.map(function(resourceListItem, idx){
                    return (
                        <li key={idx}>
                            <strong>{resourceListItem.title}</strong>
                            <ul>
                                {resourceListItem.brokers.length > 0 ? resourceListItem.brokers.map(function(broker, idy){
                                    return (
                                        <li key={idy}>
                                            <Link to={'/broker/' + broker.id + '/topics'}>{broker.host}:{broker.port}</Link>
                                        </li>
                                    )
                                }) : ''}
                            </ul>
                        </li>
                    )
                }) : ''}
            </ul>
        </div>
    );
}    

export default Sidebar;