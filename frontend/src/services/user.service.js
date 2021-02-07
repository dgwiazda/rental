import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

class UserService {
  getUserOrders(userIndex) {
    return axios.get(API_URL + "orders?userIndex=" + userIndex, {
      headers: authHeader(),
    });
  }

  changePassword(userId, oldPassword, newPassword) {
    return axios.put(API_URL + "change-password?userId=" + userId + "&oldPassword=" + oldPassword + "&newPassword=" + newPassword, null, { headers: authHeader() });
  }

  changeUsername(userId, username) {
    return axios.put(API_URL + "change-username?userId=" + userId + "&username=" + username, null, { headers: authHeader() });
  }

  changeEmail(userId, email) {
    return axios.put(API_URL + "change-email?userId=" + userId + "&email=" + email, null, { headers: authHeader() });
  }
}

export default new UserService();
