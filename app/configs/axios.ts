import axios from "axios";
import {Env} from "~/configs/env";

console.log(Env.BASE_API_URL)

export const axiosInstance = axios.create({
  baseURL: Env.BASE_API_URL,
})