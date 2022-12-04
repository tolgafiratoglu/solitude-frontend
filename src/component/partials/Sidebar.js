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
                {clusterList && clusterList.length > 0 ? clusterList.map(function(clusterListItem, idx){
                    return (
                        <li key={idx}>
                            <h6>{clusterListItem.title}</h6>
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
                <li>
                    <Link to={'/ksql'}>KSQL</Link>
                </li>
            </ul>
        </div>
    );
}    

export default Sidebar;