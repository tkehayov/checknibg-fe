import axios from "axios";
import { BASE_URL } from "../config";

export class ProductApi {
  static async fetchProduct(id) {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    return response.data;
  }
}
