import { SET_NAME, SET_CHATROOM } from "./actionTypes";

const initState = {
    name: "",
    chatroomName: "",
    chatroomId: "",
};

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SET_NAME:
            return {
                ...state,
                name: payload,
            };

        case SET_CHATROOM:
            return {
                ...state,
                chatroomName: payload.name,
                chatroomId: payload._id,
            };

        default:
            return state;
    }
};

export default reducer;
