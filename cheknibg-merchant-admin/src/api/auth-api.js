import axios from "axios";
import { API_URLS } from "../config";

export class AuthApi {
  static async registerMerchant(email, password, url) {
    let headers = {};

    if (
      getAuthToken() !== null &&
      getAuthToken() !== "null" &&
      getAuthToken() !== ""
    ) {
      headers = { Authorization: `Bearer ${getAuthToken()}` };
    }
    let response = await axios
      .post(
        `${API_URLS.base}/auth/register`,
        {
          email: email,
          password: password,
          url: url,
          role: "MANAGER",
        },
        headers
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error) {
          return error.response;
        }
      });
    return response.data;
  }

  static async loginUser(email, password) {
    const response = await axios
      .post(`/auth/authenticate`, {
        email: email,
        password: password,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error) {
          return error.response;
        }
      });

    return response.data;
  }
}

export const getAuthToken = () => {
  let token = window.localStorage.getItem("access_token");
  return token === "undefined" ? "" : token;
};

export const setAuthToken = (token) => {
  return window.localStorage.setItem("access_token", token);
};
