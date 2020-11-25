import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "./index.scss";
import RPT from "prop-types";

let notyf = new Notyf({
    position: {
        x: "right",
        y: "top",
    },
});
function HomePage({ history }) {
    const { register, handleSubmit } = useForm();

    let submitHandler = (data) => {
        history.push(`/chat?name=${data.username}&room=${data.room}`);
    };
    return (
        <div className=" home-background">
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={{ span: 10, offset: 1 }} lg={{ span: 11, offset: 1 }} xl={{ span: 11, offset: 1 }}>
                        <div className="login-card shadow rounded">
                            <Row>
                                <Col xs={0} sm={0} md={0} lg={6} xl={6}>
                                    <div className="login-image"></div>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <div>
                                        <h4 className="text-center mt-5 brim-text">Brim Portal</h4>

                                        <Form onSubmit={handleSubmit(submitHandler)} id="input-form">
                                            <Row>
                                                <Col
                                                    xs={{ offset: 1, span: 10 }}
                                                    sm={{ offset: 1, span: 10 }}
                                                    md={{ offset: 1, span: 10 }}
                                                    lg={10}
                                                    xl={10}
                                                >
                                                    {" "}
                                                    <h5 className="text-center brim-text">Enter Your Brimtails</h5>
                                                    <hr />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    xs={{ offset: 1, span: 10 }}
                                                    sm={{ offset: 1, span: 10 }}
                                                    md={{ offset: 1, span: 10 }}
                                                    lg={10}
                                                    xl={10}
                                                >
                                                    {" "}
                                                    <Form.Group controlId="formBasicid">
                                                        <Form.Label>Enter Username</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Username"
                                                            name="username"
                                                            ref={register({
                                                                required: true,
                                                            })}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    xs={{ offset: 1, span: 10 }}
                                                    sm={{ offset: 1, span: 10 }}
                                                    md={{ offset: 1, span: 10 }}
                                                    lg={10}
                                                    xl={10}
                                                >
                                                    <Form.Group controlId="formBasicPassword">
                                                        <Form.Label>Enter Room Name</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Room Name"
                                                            name="room"
                                                            ref={register({
                                                                required: true,
                                                            })}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                {" "}
                                                <Col
                                                    xs={{ offset: 1, span: 10 }}
                                                    sm={{ offset: 1, span: 10 }}
                                                    md={{ offset: 1, span: 10 }}
                                                    lg={10}
                                                    xl={10}
                                                >
                                                    <Button type="submit" size="lg" className="login-button mb-5">
                                                        Join
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

HomePage.propTypes = {
    history: RPT.object,
};
export default HomePage;
