import axios from "axios";
import { BASE_URL } from "../config";

export class ProductCategoriesApi {
  static async fetchCategories() {
    const response = await axios.get(`${BASE_URL}/categories`);

    return response.data;
  }

  static async fetchCategoryByAlias(alias) {
    const response = await axios.get(`${BASE_URL}/categories/${alias}`);

    return response.data;
  }
}
