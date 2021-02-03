import axios from 'axios';

const API_URL = 'http://localhost:8080/api/product/';

class ProductService {

  getItemPrice(itemIndex) {
    return axios.get(API_URL + 'price?itemIndex=' + itemIndex);
  }
}

export default new ProductService();