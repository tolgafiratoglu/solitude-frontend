import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table } from 'reactstrap';
import Sidebar from "./partials/Sidebar";

import { clusterService } from '../service/clusterService'
import { tokenRefreshService } from '../service/tokenService'

const Dashboard = (props) => {

    const [clusterList, setClusterList] = React.useState([]);
    const params = useParams()

    const getClusterList = () => {
        clusterService().then(
            (response) => {
                setClusterList(response.data)
            }
        )
    }

    useEffect(() => {
        getClusterList()
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
                        {clusterList && clusterList.length > 0 ? (
                            <Table>
                                <thead>
                                <tr>
                                    <th>Cluster Title</th>
                                    <th>Number of Brokers</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {clusterList && clusterList.length > 0 ? clusterList.map(function(cluster, idx){
                                    return (
                                        <tr key={idx}>
                                            <td>{cluster.title}</td>
                                            <td>{cluster.num_brokers} Brokers</td>
                                            <td>
                                                <Link to={'/cluster/' + cluster.id + '/topic/create'}>Create Topic</Link>
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

export default Dashboard;