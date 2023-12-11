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

  static async fetchCategoryFilters(categoryId) {
    const response = await axios.get(
      `${BASE_URL}/categories/filters/${categoryId}`
    );

    return response.data;
  }

  static async fetchProductFilters(categoryId, filtersId, page) {
    const response = await axios.get(
      `${BASE_URL}/products/filters/${categoryId}`,
      { params: { filters: `${filtersId}`, page: `${page - 1}` } }
    );

    return response.data;
  }

  static async fetchCategoryProducts(categoryId, page) {
    const response = await axios.get(
      `${BASE_URL}/products/category/${categoryId}`,
      { params: { page: `${page - 1}` } }
    );

    return response.data;
  }
}
