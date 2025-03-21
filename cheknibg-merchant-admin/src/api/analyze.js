import axios from "axios";
import { API_URLS } from "../config";

export class AnalyzeApi {
  static async getMonthlyTotalProducts(merchantId, month) {
    const response = await axios
      .get(
        `${API_URLS.finance}/product-counter/month/${month}?merchantId=${merchantId}`
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
  static async getProductYearlyCounter(productId, merchantId) {
    const response = await axios
      .get(
        `${API_URLS.finance}/product-counter/yearly/${productId}?merchantId=${merchantId}`
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
}
