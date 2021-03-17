import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { setName } from "./redux/actions";
import { useDispatch } from "react-redux";
import { getChatrooms } from "./redux/actions";
import { askForPermissioToReceiveNotifications } from "./push-notification";

export default ({ chatroomId }) => {
    const [inputName, setInputName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatrooms());
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputName) {
            askForPermissioToReceiveNotifications(chatroomId);
            dispatch(setName(inputName));
        }
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
