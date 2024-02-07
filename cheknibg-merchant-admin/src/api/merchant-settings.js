import axios from "axios";
import { BASE_URL } from "../config";

export class MerchantSettingsApi {
  static async getMerchantUrlImportSettings(merchantId) {
    const response = await axios.get(
      `${BASE_URL}/merchants-settings/${merchantId}`
    );

    return response.data;
  }

  static async createMerchantUrlImportSettings(url, merchantId) {
    const response = await axios.post(`${BASE_URL}/merchants-settings`, {
      url: url,
      merchant: {
        id: merchantId,
      },
    });

    return response.data;
  }

  static async updateMerchantUrlImportSettings(url, merchantId, id) {
    const response = await axios.put(`${BASE_URL}/merchants-settings`, {
      id: id,
      url: url,
      merchant: {
        id: merchantId,
      },
    });

    return response.data;
  }

  static async deleteMerchantUrlImportSettings(id) {
    const response = await axios.delete(`${BASE_URL}/merchants-settings/${id}`);

    return response.data;
  }
}
