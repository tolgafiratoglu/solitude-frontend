import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import Sidebar from "./partials/Sidebar";

import { clusterInfoService, topicService, topicPartitionIncrease } from '../service/clusterService'
import { tokenRefreshService } from '../service/tokenService'

const TopicPartitionIncrease = (props) => {

    const [partitionCount, setPartitionCount] = React.useState([]);
    const [cluster, setCluster] = React.useState([]);

    const [warning, setWarning] = React.useState('');
    const [clusterId, setClusterId] = React.useState(0);
    const [topic, setTopic] = React.useState("");
    const [noPartitions, setNoPartitions] = React.useState(1);

    const params = useParams()

    const initData = (clusterId, topic) => {
        
        clusterInfoService(clusterId).then(
            (response) => {
                setCluster(response.data)
            }
        )

        topicService(clusterId, topic).then(
            (response) => {
                initForm(response.data.num_partitions)
            }
        )

    }

    const initForm = (numPartitions) => {
        let options = []
        for(var i = numPartitions + 1; i < numPartitions + 10; i++) {
            options.push(<option value={i} key={i}>{i}</option>)
        }
        setPartitionCount(options);
    }

    const increasePartition = () => {
        topicPartitionIncrease(clusterId, topic, noPartitions)
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
        setTopic(params.topic)
        initData(params.clusterid, params.topic)
        
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
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to={'/cluster/' + clusterId + '/topics'}>{cluster.title}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>{topic}</BreadcrumbItem>
                                <BreadcrumbItem active>Increase Partition</BreadcrumbItem>
                            </Breadcrumb>
                            {warning != '' && <Alert color="warning">{warning}</Alert>}
                            <Form>
                                <FormGroup key="form-sb-replication">
                                    <Label>Number of Partitions</Label>
                                    <Input type={"select"} onChange={e => setNoPartitions(e.target.value)} type="select" name="no_partitions" id="no_partitions">
                                        {partitionCount}
                                    </Input>
                                </FormGroup>
                                <Button onClick={() => {increasePartition()}}>Create</Button>
                            </Form>    
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}    

export default TopicPartitionIncrease;