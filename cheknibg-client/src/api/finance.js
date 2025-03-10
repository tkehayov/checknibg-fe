import axios from "axios";
import { API_URLS } from "../config";

export class FinanceApi {
  static async updateCounter(data) {
    const response = await axios.post(
      `${API_URLS.finance}/product-counter`,
      data
    );

    return response.data;
  }
}
