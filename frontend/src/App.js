// Import React and Component
import React from "react";
// Import CSS from App.css
import styles from "./App.module.css";
import { io } from "socket.io-client";

const App = () => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
        console.log("socket is connected", socket.id);
    });

    return (
        <div className="container p-b-md p-r-md p-l-md">
            <div className={styles["chat-window"]}>
                <ul className={styles.messages}></ul>
                <form className={styles.form}>
                    <input className={styles.input} autoComplete="off" />
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

export default App;
