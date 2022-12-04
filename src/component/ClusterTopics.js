import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table } from 'reactstrap';
import Sidebar from "./partials/Sidebar";

import { clusterTopicsService } from '../service/clusterService'
import { tokenRefreshService } from '../service/tokenService'

const ClusterTopics = (props) => {

    const [topicList, setTopicList] = React.useState([]);
    const params = useParams()

    const getClusterTopics = (clusterId) => {
        clusterTopicsService(clusterId).then(
            (response) => {
                setTopicList(response.data);
            }
        )
    }

    useEffect(() => {
        getClusterTopics(params.clusterid)
        tokenRefreshService()
    }, []);

    return (
        <div>
            <Container className="content-container">
                <Row>
                    <Col xs="0" sm="3" className="d-none d-lg-block">
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs="12" sm="9">
                        <div className="content-wrapper">
                            {topicList && topicList.length > 0 ? (
                                <Table>
                                <thead>
                                <tr>
                                    <th>Topic Title</th>
                                    <th>Number of Partitions</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {topicList && topicList.length > 0 ? topicList.map(function(topic, idx){
                                    return (
                                        <tr key={idx}>
                                            <td>{topic.topic}</td>
                                            <td>{topic.num_partitions} Partitions</td>
                                            <td>
                                                <Link to={'/cluster/' + params.clusterid + '/' + topic.topic + '/add-partition'}>Add Partition</Link>
                                            </td>
                                        </tr>
                                    )
                                }) : ''}
                                </tbody>
                                </Table>
                            ) : ''}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}    

export default ClusterTopics;