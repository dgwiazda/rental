import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin';

class AdminService {

  getAdminBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  //orders
  getOrders() {
    return axios.get(API_URL + "/orders" , { headers: authHeader() });
  }
  sortOrdersByRentDateFromAsc() {
    return axios.get(API_URL + "/orders/sort-closest", { headers: authHeader() });
  }
  sortOrdersByRentDateFromDesc() {
    return axios.get(API_URL + "/orders/sort-farest", { headers: authHeader() });
  }
  sortOrdersByPriceDesc() {
    return axios.get(API_URL + "/orders/sort-expensive", { headers: authHeader() });
  }
  sortOrdersByPriceAsc() {
    return axios.get(API_URL + "/orders/sort-cheapest", { headers: authHeader() });
  }
  sortOrdersByUser() {
    return axios.get(API_URL + "/orders/sort-user", { headers: authHeader() });
  }

  //products
  getProducts() {
    return axios.get(API_URL + "/products" , { headers: authHeader() });
  }
  sortProductsByPriceDesc() {
    return axios.get(API_URL + "/products/sort-expensive", { headers: authHeader() });
  }
  sortProductsByPriceAsc() {
    return axios.get(API_URL + "/products/sort-cheapest", { headers: authHeader() });
  }
  sortProductsByIdAsc() {
    return axios.get(API_URL + "/products/sort-id-asc", { headers: authHeader() });
  }
  sortProductsByIdDesc() {
    return axios.get(API_URL + "/products/sort-id-desc", { headers: authHeader() });
  }
  changeAvailiable(itemIndex) {
    return axios.put(API_URL + "/products/availiable?itemIndex=" + itemIndex, null, { headers: authHeader() })
  }

  //users
  getUsers() {
    return axios.get(API_URL + "/users", { headers: authHeader() });
  }
  sortUsersByUsernameAsc() {
    return axios.get(API_URL + "/users/sort-username-asc", { headers: authHeader() });
  }
  sortUsersByUsernameDesc() {
    return axios.get(API_URL + "/users/sort-username-desc", { headers: authHeader() });
  }
  sortUsersByEmailAsc() {
    return axios.get(API_URL + "/users/sort-email-asc", { headers: authHeader() });
  }
  sortUsersByEmailDesc() {
    return axios.get(API_URL + "/users/sort-email-desc", { headers: authHeader() });
  }


  //sales
  
  getMonthlySales() {
    return axios.get(API_URL + "/sales/monthly", { headers: authHeader() });
  }
  getAnnuallySales() {
    return axios.get(API_URL + "/sales/annually", { headers: authHeader() });
  }
}

export default new AdminService();