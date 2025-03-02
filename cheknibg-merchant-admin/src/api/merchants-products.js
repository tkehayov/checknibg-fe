import axios from "axios";
import { API_URLS } from "../config";
export class MerchantProductApi {
  static async getProducts(currentPage, pageSize, userId) {
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
