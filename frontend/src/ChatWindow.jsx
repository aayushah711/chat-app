import React, { useState, useEffect } from "react";
import styles from "./ChatWindow.module.css";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

export default ({ name, chatroomId }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios({
            method: "post",
            url: "http://localhost:5000/api/chat/allChats",
            data: {
                chatroomId: chatroomId,
            },
        }).then((res) => {
            setMessages(res.data.chats);
            window.scroll({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        });
    }, []);

    useEffect(() => {
        socket.on("chat message", (msg) => {
            setMessages([...messages, msg]);
            window.scroll({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
        });
    }, [messages]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (message.trim) {
            socket.emit("chat message", {
                name,
                message,
            });
            setMessage("");
        }
    };

    return (
        <div className="p-b-md p-r-md p-l-md">
            <div className={styles["chat-window"]}>
                <div className={styles["message-container"]}>
                    {messages &&
                        messages.map((item) => (
                            <div
                                key={item._id}
                                className={
                                    item.name === name
                                        ? `${styles["self-message"]} ${styles["messages"]}`
                                        : styles.messages
                                }
                            >
                                {item.name === name ? null : (
                                    <h5>{item.name}</h5>
                                )}
                                <p>{item.message}</p>
                            </div>
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
