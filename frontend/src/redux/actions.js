import { SET_NAME, SET_CHATROOM } from "./actionTypes";
import axios from "./axios";

export const setName = (payload) => ({
    type: SET_NAME,
    payload,
});

export const setChatroom = (payload) => ({
    type: SET_CHATROOM,
    payload,
});

export const getChatrooms = () => async (dispatch) => {
    try {
        let res = await axios({
            method: "get",
            url: "api/chat/allChatrooms",
        });
        dispatch(setChatroom(res.data[0]));
    } catch (err) {
        console.log(err);
        // TODO:
        // have to show alert
    }
};

export const getChats = (chatroomId) => async (dispatch) => {
    const res = axios({
        method: "post",
        url: "api/chat/allChats",
        data: {
            chatroomId,
        },
    })
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
            // TODO:
            // have to show alert
        });
    return res;
};
