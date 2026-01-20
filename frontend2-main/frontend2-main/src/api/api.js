import axios from "axios";

const api = axios.create({
  baseURL: "http:///api", // Laravel kamu
});

export default api;
