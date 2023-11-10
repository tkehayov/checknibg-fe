import axios from "axios";

export class ProductCategoriesApi {
  static async fetchCategories() {
    const response = await axios.get(`https://reqres.in/api/products/3`);

    return response.data.data;
  }
}
