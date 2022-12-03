import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Container, Row, Col, Table } from 'reactstrap';
import Sidebar from "./partials/Sidebar";

import { brokerTopicsService } from '../service/brokerService'

const Broker = (props) => {

    const [topicList, setTopicList] = React.useState([]);
    const params = useParams()

    const getBrokerTopics = (brokerId) => {
        brokerTopicsService(brokerId).then(
            (response) => {
                setTopicList(response.data);
            }
        )
    }

    useEffect(() => {
        getBrokerTopics(params.brokerid)
        console.log(topicList)
    }, []);

    return (
        <div>
            <Container className="content-container">
                <Row>
                    <Col xs="0" sm="3" className="d-none d-lg-block">
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs="12" sm="9">
                        {topicList && topicList.length > 0 ? (
                            <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Topic Title</th>
                                <th>Number of Partitions</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {topicList && topicList.length > 0 ? topicList.map(function(topic, idx){
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{topic.id}</th>
                                        <td>{topic.topic}</td>
                                        <td>{topic.num_partitions} Partitions</td>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                )
                            }) : ''}
                            </tbody>
                            </Table>
                        ) : ''}
                    </Col>
                </Row>
            </Container>
        </div>
    );

}    

export default Broker;