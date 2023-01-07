import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { clusterService } from '../../service/clusterService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard, faDatabase, faNetworkWired } from '@fortawesome/free-solid-svg-icons'

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
                <li>
                    <FontAwesomeIcon icon={faDashboard} /><Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faDatabase} /><Link to={'/ksql'}>KSQL</Link>
                </li>
                {clusterList && clusterList.length > 0 ? clusterList.map(function(clusterListItem, idx){
                    return (
                        <li key={idx}>
                            <h6 className="sidebar-title"><FontAwesomeIcon icon={faNetworkWired} />{clusterListItem.title}</h6>
                            <ul>
                                <li key="brokers-{clusterListItem}">
                                    <Link to={'/cluster/' + clusterListItem.id + '/brokers'}>Brokers</Link>
                                </li>
                                <li key="topics-{clusterListItem}">
                                    <Link to={'/cluster/' + clusterListItem.id + '/topics'}>Topics</Link>
                                </li>
                                <li key="topic-create-{clusterListItem}">
                                    <Link to={'/cluster/' + clusterListItem.id + '/topic/create'}>Create Topic</Link>
                                </li>
                            </ul>
                        </li>
                    )
                }) : ''}
                
            </ul>
        </div>
    );
}    

export default Sidebar;