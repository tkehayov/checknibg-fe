import axios from "axios";

export class ProductCategoriesApi {
  static async fetchCategories() {
    const response = await axios.get(`/categories`);

    return response.data;
  }
}
