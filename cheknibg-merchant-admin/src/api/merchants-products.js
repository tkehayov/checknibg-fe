import axios from "axios";
import { API_URLS } from "../config";
import { UserApi } from "./user-api";
export class MerchantProductApi {
  static async getProducts(currentPage, pageSize) {
    let userId = await UserApi.getMerchantId();

    const response = await axios
      .get(
        `${API_URLS.products}/merchant-product/${userId}?page=${
          currentPage - 1
        }&size=${pageSize}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });

    return response;
  }
}
