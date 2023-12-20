import axios from "axios";
import { BASE_URL } from "../config";

export class MerchantsApi {
  static async fetchMerchant(id) {
    const response = await axios.get(`${BASE_URL}/merchants/${id}`);

    return response.data;
  }
}
