import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecomern-k6h4.onrender.com/",
});

export default instance;
