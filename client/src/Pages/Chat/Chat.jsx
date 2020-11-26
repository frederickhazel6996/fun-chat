import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import RPT from "prop-types";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import Emoji from "react-emoji-render";
import "./chat.scss";
import { Colors } from "../../values";
const spawn = require("spawn-password");
let ENDPOINT = "localhost:5000";
let socket;
const Chat = ({ location, history }) => {
    const { register, handleSubmit } = useForm();
    const [name, setname] = useState("");
    const [room, setroom] = useState("");
    const [id, setid] = useState("");
    const [users, setusers] = useState([]);
    const [messages, setmessages] = useState([]);
    const [message, setmessage] = useState("");
    useEffect(() => {
        let { name, room, id } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setname(name);
        setroom(room);
        setid(id);

        localStorage.setItem("id", id);

        socket.emit("join", { name, room, id }, () => {});

        return () => {
            socket.emit("closechat");
            socket.off();
            // history.push("/");
        };
    }, [location.search, history]);

    let submitHandler = (data) => {
        setmessage(data.message);
        socket.emit("sendMessage", data.message, () => {
            document.getElementById("message-form").reset();
        });
    };

    useEffect(() => {
        socket.on("message", (message) => {
            let newMessage = { user: message.user, text: message.text };
            setmessages([...messages, newMessage]);
            if (message.users === undefined) {
            } else {
                setusers(message.users);
            }
        });
    }, [messages]);

    let tempUsers = users.map((user) => (
        <div className="users-field">
            <span>
                <i className="fas fa-user mr-3"></i>
            </span>{" "}
            {user.name}
            <br />
        </div>
    ));

    let chat = messages.map((chat) =>
        chat.user === "Moderator" ? (
            <Row key={spawn.spawnAlphaNumericLength(20)}>
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
            <Row key={spawn.spawnAlphaNumericLength(20)}>
                <Col>
                    <div className="bubble alt shadow rounded">
                        <div className="txt">
                            <p className="name alt ">{chat.user}</p>
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
            <Row key={spawn.spawnAlphaNumericLength(20)}>
                <Col>
                    <div className="bubble shadow rounded">
                        <div className="txt">
                            <p className="name" style={{ color: Colors[Math.floor(Math.random() * Colors.length)] }}>
                                {chat.user}
                            </p>
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
            <Container fluid>
                <div></div>
                <Row>
                    <Col xs={{ span: 2, offset: 1 }} className="chat-box shadow rounded">
                        <Row className="no-gutters">
                            <Col xs={12} className="user-area-banner">
                                <div className="mb-5">
                                    <span>
                                        <i className="fas fa-users mr-3"></i>
                                    </span>
                                    {room} Members
                                </div>
                                {tempUsers}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <div className="chat-box shadow rounded">
                            <Row>
                                <Col xl={12}>
                                    <div className="message-area">
                                        <div className="speech-wrapper ">{chat}</div>
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
            </Container>
        </div>
    );
};

Chat.propTypes = {
    location: RPT.object,
    history: RPT.object,
};

export default Chat;
