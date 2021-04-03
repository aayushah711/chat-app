import firebase from "firebase/app";
import "firebase/firebase-messaging";
import axios from "./redux/axios";

export const initializeFirebase = () => {
    firebase.initializeApp({
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        apiKey: "AIzaSyAcKlXLHhmGiV2WN1RwBcE6GQNzlMo1nuI",
        authDomain: "chat-app-e1d76.firebaseapp.com",
        projectId: "chat-app-e1d76",
        storageBucket: "chat-app-e1d76.appspot.com",
        messagingSenderId: "771914614602",
        appId: "1:771914614602:web:07ee6e1eae68e9040a23b3",
        measurementId: "G-FV6NX5F07V",
    });
};

export const askForPermissioToReceiveNotifications = (chatroomId, name) => {
    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(() => {
            console.log("Successfully got permission");
            return messaging.getToken();
        })
        .then((token) => {
            console.log(token);
            return axios({
                method: "post",
                url: "api/chat/addSWToken",
                data: {
                    chatroomId,
                    memberName: name,
                    swToken: token,
                },
            });
        })
        .then((res) => console.log(res))
        .catch((err) => {
            console.log("Error Occured.");
            console.error(err);
        });

    messaging.onMessage((payload) => {
        console.log("on message:", payload);
    });
};
