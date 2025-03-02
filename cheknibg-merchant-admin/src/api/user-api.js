import axios from "axios";
import { getAuthToken } from "./auth-api";
import { API_URLS } from "../config";

export class UserApi {
  static async getMerchantId() {
    let token = getAuthToken();

    const merchantId = await axios
      .get(`/auth/users/${token}`)
      .then((userIdRes) => {
        if (userIdRes.data) {
          const merchantId = axios
            .get(`${API_URLS.merchants}/merchants/user-id/${userIdRes.data}`)
            .then((merchantIdRes) => {
              return merchantIdRes.data;
            })
            .catch((error) => {
              if (error) {
                return error.response.data;
              }
            });
          return merchantId;
        }
      })
      .catch((error) => {
        if (error) {
          return "";
        }
      });

    return merchantId;
  }
}
