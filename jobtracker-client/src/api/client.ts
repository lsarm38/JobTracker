import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5185/api",
});

export default client;
