import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default ({ setName, setChatroomId }) => {
    const [inputName, setInputName] = useState("");

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/api/chat/allChatrooms",
        }).then((res) => {
            setChatroomId(res.data[0]._id);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        setName(inputName);
    };
    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        type="text"
                        placeholder="Enter your name"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};
