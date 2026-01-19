import axios from "axios";
import { API_URLS } from "../config";

export class ProductCategoriesApi {
  static async fetchCategories() {
    const response = await axios.get(`${API_URLS.products}/categories`);

    return response.data;
  }

  static async fetchCategoryByAlias(alias) {
    const response = await axios.get(
      `${API_URLS.products}/categories/${alias}`
    );

    return response.data;
  }

  static async fetchCategoryById(id) {
    const response = await axios.get(
      `${API_URLS.products}/categories/name/${id}`
    );

    return response.data;
  }

  static async fetchCategoryFilters(categoryId) {
    const response = await axios.get(
      `${API_URLS.products}/categories/filters/${categoryId}`
    );

    return response.data;
  }

  static async fetchCategoryMinMaxFilterPrice(filters) {
    if (filters.length > 0) {
      const response = await axios.get(
        `${API_URLS.products}/categories/filters/price-range`,
        {
          params: { filters: `${filters}` },
        }
      );

      return response.data;
    }
  }

  static async fetchProducts(
    filtersId,
    page,
    minPrice,
    maxPrice,
    size,
    sortNamePrice
  ) {
    if (minPrice === undefined || maxPrice === undefined) {
      const response = await axios.get(
        `${API_URLS.products}/products/filters`,
        {
          params: {
            filters: `${filtersId}`,
            page: `${page - 1}`,
            size: size,
            sortPrice:
              sortNamePrice.sort === "priceSort"
                ? sortNamePrice.direction
                : null,
          },
        }
      );
      return response.data;
    }
    const response = await axios.get(`${API_URLS.products}/products/filters`, {
      params: {
        filters: `${filtersId}`,
        page: `${page - 1}`,
        minPrice: `${minPrice}`,
        maxPrice: `${maxPrice}`,
        size: size,
        sortPrice:
          sortNamePrice.sort === "priceSort" ? sortNamePrice.direction : null,
      },
    });

    return response.data;
  }
}
