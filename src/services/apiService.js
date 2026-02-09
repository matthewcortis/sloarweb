import axios from "axios";
import { BASE_API } from "../shared/contants/api";

const apiService = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
});

export const get = (url, config) =>
  apiService.get(url, config).then((response) => response.data);

export const post = (url, data, config) =>
  apiService.post(url, data, config).then((response) => response.data);

export const put = (url, data, config) =>
  apiService.put(url, data, config).then((response) => response.data);

export default apiService;
