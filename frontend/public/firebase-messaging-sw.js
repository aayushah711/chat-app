importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAcKlXLHhmGiV2WN1RwBcE6GQNzlMo1nuI",
    authDomain: "chat-app-e1d76.firebaseapp.com",
    projectId: "chat-app-e1d76",
    storageBucket: "chat-app-e1d76.appspot.com",
    messagingSenderId: "771914614602",
    appId: "1:771914614602:web:07ee6e1eae68e9040a23b3",
    measurementId: "G-FV6NX5F07V",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
    console.log("background message");
    console.log(payload);
    const title = "Hello world";
    const options = {
        body: payload.data.status,
    };
    return self.registration.showNotification(title, options);
});
