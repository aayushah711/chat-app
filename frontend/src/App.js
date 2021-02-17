import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import EnterName from "./EnterName";

const App = () => {
    const [name, setName] = useState("");
    const [chatroomId, setChatroomId] = useState("");

    if (name) {
        return <ChatWindow name={name} chatroomId={chatroomId} />;
    } else {
        return <EnterName setName={setName} setChatroomId={setChatroomId} />;
    }
};

export default App;
