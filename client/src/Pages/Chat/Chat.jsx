import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import RPT from "prop-types";
let ENDPOINT = "localhost:5000";
let socket;
const Chat = ({ location }) => {
    const [name, setname] = useState("");
    const [room, setroom] = useState("");
    useEffect(() => {
        let { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setname(name);
        setroom(room);
        socket.emit("join", { name, room });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [location.search]);
    return (
        <div>
            <h1>Lets Chat</h1>
        </div>
    );
};

Chat.propTypes = {
    location: RPT.object,
};

export default Chat;
