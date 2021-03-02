import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost/laravel_backend/api/';

class UserService {
  getUserBoard() {
    return axios.get(API_URL + 'products', { headers: authHeader() });
  }
 
  getAdminBoard(product_id) {
    return axios.get(API_URL + 'products/'+product_id, { headers: authHeader() });
  }
}

export default new UserService();
