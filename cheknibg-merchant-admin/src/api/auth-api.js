import axios from "axios";
import { BASE_URL } from "../config";

export class AuthApi {
  // register USer
  static async registerUser(firstName, lastName, username, password) {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
      headers = { Authorization: `Baerer ${getAuthToken()}` };
    }
    const response = await axios.post(
      `${BASE_URL}/register`,
      {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: password,
      },
      headers
    );

    return response.data;
  }

  // login USer

  static async loginUser(username, password) {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
      headers = { Authorization: `Baerer ${getAuthToken()}` };
    }
    const response = await axios.post(`${BASE_URL}/login`, {
      login: username,
      password: password,
    });

    return response.data;
  }
}

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
  return window.localStorage.setItem("auth_token", token);
};
