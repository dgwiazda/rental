import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

class UserService {
  getUserOrders(userId) {
    return axios.get(API_URL + "orders?userId=" + userId, {
      headers: authHeader(),
    });
  }
  sortUserOrdersByRentDateFromAsc(userId) {
    return axios.get(API_URL + "orders/sort-closest?userId=" + userId, {
      headers: authHeader(),
    });
  }
  sortUserOrdersByRentDateFromDesc(userId) {
    return axios.get(API_URL + "orders/sort-farest?userId=" + userId, {
      headers: authHeader(),
    });
  }
  sortUserOrdersByPriceAsc(userId) {
    return axios.get(API_URL + "orders/sort-cheapest?userId=" + userId, {
      headers: authHeader(),
    });
  }
  sortUserOrdersByPriceDesc(userId) {
    return axios.get(API_URL + "orders/sort-expensive?userId=" + userId, {
      headers: authHeader(),
    });
  }
  sortUserOrdersByProductAsc(userId) {
    return axios.get(API_URL + "orders/sort-product?userId=" + userId, {
      headers: authHeader(),
    });
  }

  deleteOrder(orderId) {
    return axios.delete(API_URL + "orders/cancel?index=" + orderId, {
      headers: authHeader(),
    });
  }

  changePassword(userId, oldPassword, newPassword) {
    return axios.put(
      API_URL +
        "change-password?userId=" +
        userId +
        "&oldPassword=" +
        oldPassword +
        "&newPassword=" +
        newPassword,
      null,
      { headers: authHeader() }
    );
  }

  changeUsername(userId, username) {
    return axios.put(
      API_URL + "change-username?userId=" + userId + "&username=" + username,
      null,
      { headers: authHeader() }
    );
  }

  changeEmail(userId, email) {
    return axios.put(
      API_URL + "change-email?userId=" + userId + "&email=" + email,
      null,
      { headers: authHeader() }
    );
  }
}

export default new UserService();
