import axios from "axios";

let agent;

if (process.env.NODE_ENV === "development") {
    agent = axios.create({ baseURL: "http://localhost:5000/" });
} else {
    agent = axios.create({ baseURL: "/" });
}

export default agent;
