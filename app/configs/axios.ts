import axios from "axios";
import {Env} from "~/configs/env";

export const axiosInstance = axios.create({
  baseURL: Env.BASE_API_URL,
})