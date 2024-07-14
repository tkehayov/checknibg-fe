import axios from "axios";
import { API_URLS } from "../config";

export class MerchantsApi {
  static async fetchMerchant(id) {
    const response = await axios.get(`${API_URLS.merchants}/merchants/${id}`);

    return response.data;
  }
}
