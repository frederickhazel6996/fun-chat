import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import RPT from "prop-types";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";

let ENDPOINT = "localhost:5000";
let socket;
const Chat = ({ location }) => {
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

    let chat = messages.map((chat) => <h1>{chat.text}</h1>);
    return (
        <div>
            {chat}
            <form onSubmit={handleSubmit(submitHandler)} id="message-form">
                <input
                    type="text"
                    id="input"
                    name="message"
                    className="form__field"
                    placeholder="Enter message"
                    ref={register({
                        required: true,
                    })}
                />
            </form>
        </div>
    );
};

Chat.propTypes = {
    location: RPT.object,
};

export default Chat;
