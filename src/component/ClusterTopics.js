import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header"

import { clusterTopicsService, clusterInfoService } from '../service/clusterService'
import { tokenRefreshService } from '../service/tokenService'

const ClusterTopics = (props) => {

    const [topicList, setTopicList] = React.useState([]);
    const params = useParams()

    const [cluster, setCluster] = React.useState([]);

    const getClusterTopics = (clusterId) => {
        clusterTopicsService(clusterId).then(
            (response) => {
                setTopicList(response.data);
            }
        )
    }

    const initData = () => {
        clusterInfoService(params.clusterid).then(
            (response) => {
                setCluster(response.data)
            }
        )
    }

    useEffect(() => {
        getClusterTopics(params.clusterid)
        tokenRefreshService()
        initData()
    }, []);

    return (
        <div>
            <Header></Header>
            <Container className="content-container">
                <Row>
                    <Col xs="0" sm="3" className="d-none d-lg-block">
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs="12" sm="9">
                        <div className="content-wrapper">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    {cluster.title}
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Topics</BreadcrumbItem>
                            </Breadcrumb>
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
                                                <Link to={'/cluster/' + params.clusterid + '/' + topic.topic + '/add-partition'}>Increase Partitions</Link>
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