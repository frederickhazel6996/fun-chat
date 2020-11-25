import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import RPT from "prop-types";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import Emoji from "react-emoji-render";
import "./chat.scss";

let ENDPOINT = "localhost:5000";
let socket;
const Chat = ({ location, history }) => {
    const { register, handleSubmit } = useForm();
    const [name, setname] = useState("");
    const [room, setroom] = useState("");
    const [messages, setmessages] = useState([]);
    const [message, setmessage] = useState("");
    useEffect(() => {
        let { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setname(name);
        setroom(room);
        console.log(name, room);
        socket.emit("join", { name, room }, () => {});

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [location.search]);

    let submitHandler = (data) => {
        setmessage(data.message);
        socket.emit("sendMessage", data.message, () => {
            document.getElementById("message-form").reset();
        });
    };
    console.log(message, messages);

    useEffect(() => {
        socket.on("message", (message) => {
            setmessages([...messages, message]);
        });
    }, [messages]);

    let chat = messages.map((chat) =>
        chat.user === "Moderator" ? (
            <Row>
                <Col>
                    <div className="text-center">
                        <p className="moderator-text ">
                            {chat.text}
                            <span> ~ Moderator</span>
                        </p>
                    </div>
                </Col>
            </Row>
        ) : chat.user === name.trim().toLowerCase() ? (
            <Row>
                <Col>
                    <div className="bubble alt shadow rounded">
                        <div className="txt">
                            <p className="name alt">{chat.user}</p>
                            <p className="message">
                                <Emoji text={chat.text} />
                            </p>
                            <span className="timestamp">10:22 pm</span>
                        </div>
                        <div className="bubble-arrow alt"></div>
                    </div>
                </Col>
            </Row>
        ) : (
            <Row>
                <Col>
                    <div className="bubble shadow rounded">
                        <div className="txt">
                            <p className="name">{chat.user}</p>
                            <p className="message">
                                <Emoji text={chat.text} />
                            </p>
                            <span className="timestamp">10:20 pm</span>
                        </div>
                        <div className="bubble-arrow"></div>
                    </div>
                </Col>
            </Row>
        )
    );
    return (
        <div className="chat-page">
            <Container>
                <Row>
                    <Col xl={12}>
                        <div className="chat-box shadow rounded">
                            <Row>
                                <Col xl={12}>
                                    <div className="message-area">
                                        <div className="speech-wrapper ">
                                            {/* <Row>
                                                <Col>
                                                    <div className="text-center">
                                                        <p className="moderator-text ">
                                                            Meister_Kwame Joined the Chat<span> ~ Moderator</span>
                                                        </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="bubble shadow rounded">
                                                        <div className="txt">
                                                            <p className="name">Benni</p>
                                                            <p className="message">Hey, check out this Pure CSS speech bubble...</p>
                                                            <span className="timestamp">10:20 pm</span>
                                                        </div>
                                                        <div className="bubble-arrow"></div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="bubble alt shadow rounded">
                                                        <div className="txt">
                                                            <p className="name alt">
                                                                +353 87 1234 567<span> ~ John</span>
                                                            </p>
                                                            <p className="message">Nice... this will work great for my new project.</p>
                                                            <span className="timestamp">10:22 pm</span>
                                                        </div>
                                                        <div className="bubble-arrow alt"></div>
                                                    </div>
                                                </Col>
                                            </Row> */}
                                            {chat}
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <form onSubmit={handleSubmit(submitHandler)} autoComplete="off" id="message-form">
                                <Row className="no-gutters">
                                    <Col xs={10}>
                                        <div className="text-area padding-0">
                                            <input
                                                type="text"
                                                id="input"
                                                name="message"
                                                className="text-field text-input"
                                                placeholder="Enter message"
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                        <Button type="submit" className="send-area padding-0">
                                            Brim
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
                {/* <div>
                    {chat}
                    
                </div> */}
            </Container>
        </div>
    );
};

Chat.propTypes = {
    location: RPT.object,
    history: RPT.object,
};

export default Chat;
