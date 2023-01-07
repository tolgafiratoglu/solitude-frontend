import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Sidebar from "./partials/Sidebar"
import Header from "./partials/Header"

import { clusterBrokersService, clusterInfoService } from '../service/clusterService'
import { tokenRefreshService } from '../service/tokenService'

const ClusterBrokers = (props) => {

    const [brokerList, setBrokerList] = React.useState([]);
    const [cluster, setCluster] = React.useState([]);

    const params = useParams()

    const getClusterBrokers = (clusterId) => {
        clusterBrokersService(clusterId).then(
            (response) => {
                setBrokerList(response.data);
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
        getClusterBrokers(params.clusterid)
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
                                <BreadcrumbItem active>Brokers</BreadcrumbItem>
                            </Breadcrumb>
                            {brokerList && brokerList.length > 0 ? (
                                <Table>
                                <thead>
                                <tr>
                                    <th>Broker Title</th>
                                    <th>Host</th>
                                    <th></th>
                                </tr>
                                </thead>
                                    <tbody>
                                    {brokerList && brokerList.length > 0 ? brokerList.map(function(broker, idx){
                                        return (
                                            <tr key={idx}>
                                                <td>{broker.title}</td>
                                                <td>{broker.host + ':' + broker.port}</td>
                                                <td>
                                                    <Link to={'/cluster/' + params.clusterid + '/' + broker.topic + '/add-partition'}>Add Partition</Link>
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

export default ClusterBrokers;