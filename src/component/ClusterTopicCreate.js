import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";

import { clusterInfoService, clusterTopicService } from '../service/clusterService'
import { tokenRefreshService } from '../service/tokenService'

const ClusterTopicCreate = (props) => {

    const [replicationCount, setReplicationCount] = React.useState([]);
    const [cluster, setCluster] = React.useState([]);

    const [warning, setWarning] = React.useState('');
    const [clusterId, setClusterId] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const [noPartitions, setNoPartitions] = React.useState(1);
    const [replicationFactor, setReplicationFactor] = React.useState(1);

    const params = useParams()

    const initCluster = (clusterId) => {
        clusterInfoService(clusterId).then(
            (response) => {
                setCluster(response.data)
            }
        )
    }

    const initForm = (clusterId) => {
        let options = []
        for(var i = 1; i < 10; i++) {
            options.push(<option value={i} key={i}>{i}</option>)
        }
        setReplicationCount(options);
    }

    const createTopic = () => {
        clusterTopicService(clusterId, title, noPartitions, replicationFactor)
            .then(
                (response) => {
                    if (response.status === 'error') {
                        setWarning(response.error.response.data.message)
                    }
                    if (response.status === 200) {
                        window.location = '/cluster/' + clusterId + '/topics'
                    }    
                }
            )
    }

    useEffect(() => {
        setClusterId(params.clusterid)
        initForm(params.clusterid)
        initCluster(params.clusterid)
        tokenRefreshService()
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
                                    <Link to={'/cluster/' + clusterId + '/topics'}>{cluster.title}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Create Topic</BreadcrumbItem>
                            </Breadcrumb>
                            {warning != '' && <Alert color="warning">{warning}</Alert>}
                            <Form>
                                <FormGroup key="form-input">
                                    <Label>Topic Name</Label>
                                    <Input onChange={e => setTitle(e.target.value)} type="text" name="title" id="title" placeholder="Topic Title" />
                                </FormGroup>
                                <FormGroup key="form-sb-partition">
                                    <Label>Partition Number</Label>
                                    <Input type={"select"} value={noPartitions} onChange={e => setNoPartitions(e.target.value)} type="select" name="partition_number" id="partition_number">
                                        <option value="1">1</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup key="form-sb-replication">
                                    <Label>Replication Factor</Label>
                                    <Input type={"select"} value={replicationFactor} onChange={e => setReplicationFactor(e.target.value)} type="select" name="replication_factor" id="replication_factor">
                                        {replicationCount}
                                    </Input>
                                </FormGroup>
                                <Button onClick={() => {createTopic()}}>Create</Button>
                            </Form>    
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}    

export default ClusterTopicCreate;