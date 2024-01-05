import axios from "axios";
import { BASE_URL } from "../config";

export class ProductApi {
  static async fetchProduct(id) {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    return response.data;
  }

  static async searchProduct(searchTerm) {
    const response = await axios.get(
      `${BASE_URL}/products/search/?s=${searchTerm}`
    );

    return response.data;
  }
}
