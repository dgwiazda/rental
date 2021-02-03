import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/order/";

class OrderService {
  add(data) {
    return axios.post(
      API_URL + "add", data, { headers: authHeader() }
    );
  }
}

export default new OrderService();