import httpClient from "../utils/httpClient";
import {BASE_API_URL} from "../utils/constants";

class AuthService {
  async login(email, password) {
    return await httpClient.post(`${BASE_API_URL}/login`, {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("access_token");
  }

  is_authenticated() {
    return httpClient.get(`${BASE_API_URL}/is_authenticated`);
  }

  signup(username, email, password) {
    return httpClient.post(`${BASE_API_URL}/register`, {
      username,
      email,
      password,
    });
  }

  is_user(email) {
    return httpClient.post(`${BASE_API_URL}/is_user`, { email });
  }
}

export default new AuthService();

