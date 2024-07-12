import axios from "axios";
import { API_URLS } from "../config";

export class MerchantSettingsApi {
  static async getMerchantUrlImportSettings(merchantId) {
    const response = await axios
      .get(`${API_URLS.merchants}/merchants-settings/${merchantId}`)
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

  static async createMerchantUrlImportSettings(url, merchantId) {
    const response = await axios.post(
      `${API_URLS.merchants}/merchants-settings`,
      {
        url: url,
        merchant: {
          id: merchantId,
        },
      }
    );

    return response.data;
  }

  static async updateMerchantUrlImportSettings(url, merchantId, id) {
    const response = await axios.put(
      `${API_URLS.merchants}/merchants-settings`,
      {
        id: id,
        url: url,
        merchant: {
          id: merchantId,
        },
      }
    );

    return response.data;
  }

  static async deleteMerchantUrlImportSettings(id) {
    const response = await axios.delete(
      `${API_URLS.merchants}/merchants-settings/${id}`
    );

    return response.data;
  }
}
