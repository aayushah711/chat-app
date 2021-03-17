import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatWindow.module.css";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setName, getChats } from "./redux/actions";
import Chat from "./Chat";

const socket = io("http://localhost:5000");

export default ({ name, chatroomId, chatroomName }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const messageContainer = useRef(null);

    useEffect(() => {
        dispatch(getChats(chatroomId)).then((res) => {
            setMessages(res && res.chats);
            scrollWindow();
        });
    }, []);

    useEffect(() => {
        socket.on("chat message", (msg) => {
            setMessages([...messages, msg]);
            scrollWindow();
        });
    }, [messages]);

    const scrollWindow = () => {
        let div = document.querySelector("#messageContainer");
        div.scrollTop = div.scrollHeight;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit("chat message", {
                name,
                message,
                createdAt: Date.now(),
            });
            setMessage("");
        }
    };

    const goBack = () => {
        dispatch(setName(""));
    };

    return (
        <div className="p-b-md p-r-md p-l-md">
            <div id="messageContainer" className={styles["chat-window"]}>
                <div className={styles["group-name"]}>
                    <img
                        onClick={goBack}
                        src="/resources/back.svg"
                        alt="back"
                        style={{ cursor: "pointer" }}
                    />
                    <div>{chatroomName}</div>
                    <div></div>
                </div>
                <div className={styles["message-container"]}>
                    {messages &&
                        messages.map((item) => (
                            <Chat name={name} item={item} />
                        ))}
                </div>
                <form className={styles.form} onSubmit={onSubmit}>
                    <input
                        className={styles.input}
                        autoFocus
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoComplete="off"
                    />
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};
