import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import EnterName from "./EnterName";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
    const name = useSelector((state) => state.name);
    const chatroomId = useSelector((state) => state.chatroomId);
    const chatroomName = useSelector((state) => state.chatroomName);

    if (name) {
        return (
            <ChatWindow
                name={name}
                chatroomId={chatroomId}
                chatroomName={chatroomName}
            />
        );
    } else {
        return <EnterName chatroomId={chatroomId} />;
    }
};

export default App;
