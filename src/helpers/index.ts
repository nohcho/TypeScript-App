import axios from "axios";

import { urlPath } from "../constants/index";

const request = axios.create({
  baseURL: urlPath,
});


export default request;
