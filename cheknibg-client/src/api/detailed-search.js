import axios from "axios";
import { API_URLS } from "../config";

export class DetailedSearchApi {
  static async fetchFiltersBySearchTerm(searchTerm) {
    const response = await axios.get(
      `${API_URLS.products}/categories/filters/search/${searchTerm}`
    );

    return response.data;
  }

  static async fetchProducts(searchTerm) {
    const response = await axios.get(
      `${API_URLS.products}/products/search/detailed`,
      { params: { s: `${searchTerm}` } }
    );

    return response.data;
  }

  static async fetchProductsWithFilters(
    searchTerm,
    filtersId,
    page,
    size,
    sortNamePrice
  ) {
    const response = await axios.get(
      `${API_URLS.products}/products/search/detailed`,
      {
        params: {
          s: `${searchTerm}`,
          filtersId: `${filtersId}`,
          size: `${size}`,
          page: `${page - 1}`,
          sortPrice:
            sortNamePrice.sort === "priceSort" ? sortNamePrice.direction : null,
          sortName:
            sortNamePrice.sort === "nameSort" ? sortNamePrice.direction : null,
        },
      }
    );

    return response.data;
  }
}
