import axios from "axios";
import { API_URLS } from "../config";

export class MerchantProductApi {
  static async getProducts(currentPage, pageSize) {
    const response = await axios.get(
      `${API_URLS.products}/merchant-product/2?page=${
        currentPage - 1
      }&size=${pageSize}`
    );

    return response.data;
  }
}
