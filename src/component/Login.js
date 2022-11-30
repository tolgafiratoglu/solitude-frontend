import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'

import { loginService } from '../service/loginService'

const Login = (props) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState('');
    
    const handleRequest = async () => {
        return await loginService(username, password)
            .then(
                (loginResponse) => {
                    if (loginResponse.status === 'success') {
                        
                    }
                }
            )
    }    

    return (
        <div>
            <Container className="content-container">
                <Row>
                    <Col xs="12" sm="12">
                        <div className="content-canvas content-wrapped-boxed">
                            <Form>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="username" className="mr-sm-2 mt-sm-1">Username</Label>
                                    <Input type="username" name="username" id="login_username" placeholder="Username"
                                           onChange={e => setUsername(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="password" className="mr-sm-2 mt-sm-1">Password</Label>
                                    <Input type="password" name="password" id="login_password" placeholder=""
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-sm-3">
                                    <Button onClick={()=>{handleRequest()}}>
                                        Sign In
                                    </Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;