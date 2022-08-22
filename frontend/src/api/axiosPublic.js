import axios from "axios";

const baseURL = "http://localhost:8080/v1";

export const axiosPublic = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
