import httpClient from "../utils/httpClient";
import {BASE_API_URL} from "../utils/constants";

class AuthService {
  async login(email, password) {
    try {
      const response = await httpClient.post(`${BASE_API_URL}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  is_authenticated() {
    return httpClient.get(`${BASE_API_URL}/is_authenticated`);
  }

  signup(username, email, password) {
    return httpClient.post(`${BASE_API_URL}/signup`, {
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

