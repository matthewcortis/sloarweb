import axios from "axios";
import { BASE_API } from "../shared/constants/api";

const axiosClient = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
