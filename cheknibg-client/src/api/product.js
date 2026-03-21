import axios from "axios";
import { API_URLS } from "../config";

export class ProductApi {
  static async fetchProduct(id) {
    const response = await axios.get(`${API_URLS.products}/products/${id}`);

    return response.data;
  }

  static async searchProduct(searchTerm) {
    const response = await axios.get(
      `${API_URLS.products}/products/search?s=${searchTerm}`,
    );

    return response.data;
  }
}
