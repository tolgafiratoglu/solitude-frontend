import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Sidebar from "./partials/Sidebar";

const Dashboard = (props) => {

    const [clusterList, setClusterList] = React.useState([]);

    return (
        <div>
            <Container className="content-container">
                <Row>
                    <Col xs="0" sm="3" className="d-none d-lg-block">
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs="12" sm="9">
                    {clusterList && clusterList.length > 0 ? clusterList.map(function(clusterListItem, idx){
                        return (
                            <div>
                                test
                            </div>
                        )
                    }) : ''}
                    </Col>
                </Row>
            </Container>
        </div>
    );

}    

export default Dashboard;