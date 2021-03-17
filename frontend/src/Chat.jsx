import React from "react";
import styles from "./Chat.module.css";
import moment from "moment";

export default ({ name, item }) => {
    return (
        <div
            key={item._id}
            className={
                item.name === name
                    ? `${styles["self-message"]} ${styles["messages"]}`
                    : styles.messages
            }
        >
            <div className={styles["name-time"]}>
                <span>{item.name === name ? null : <h5>{item.name}</h5>}</span>
                <span className={styles.time}>
                    {moment(item.createdAt).format("LT")}
                </span>
            </div>
            <p>{item.message}</p>
        </div>
    );
};
