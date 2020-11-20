import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

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
        <div className="main">
            <Container>
                <Row>
                    <Col xs={12} xl={12}>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="Input">
                                <input
                                    type="text"
                                    id="input"
                                    name="username"
                                    className="form__field"
                                    placeholder="Enter Username"
                                    ref={register({
                                        required: true,
                                    })}
                                />
                                <input
                                    type="text"
                                    id="input"
                                    name="room"
                                    className="form__field"
                                    placeholder="Enter Room Name"
                                    ref={register({
                                        required: true,
                                    })}
                                />
                                <button>Join</button>
                            </div>
                        </form>
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
