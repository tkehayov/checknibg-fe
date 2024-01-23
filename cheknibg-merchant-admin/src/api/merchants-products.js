import axios from "axios";
import { BASE_URL } from "../config";

export class MerchantProductApi {
  static async getProducts(currentPage, pageSize) {
    const response = await axios.get(
      `${BASE_URL}/merchant-product/2?page=${currentPage - 1}&size=${pageSize}`
    );

    return response.data;
  }
}
