import axios from "axios";
import { baseUrl } from "./Constance/constance";

const instance = axios.create({
    baseURL: baseUrl
  });

  export default instance