import { useState, useEffect } from "react";
import { ProductCategoriesApi } from "../../api/product-categories";
import { ProductFiltersListItem } from "../ProductFiltersListItem/ProductFiltersListItem";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";

export function ProductList({ categoryFilters, selectedProductFilters }) {
  const [currentProducts, setCurrentProducts] = useState([]);

  async function fetchProductFilters() {
    const products = await ProductCategoriesApi.fetchProductFilters(
      categoryFilters.id,
      selectedProductFilters
    );

    if (products) {
      setCurrentProducts(products);
    }
  }

  async function fetchCategoryProducts() {
    const products = await ProductCategoriesApi.fetchCategoryProducts(
      categoryFilters.id
    );

    if (products) {
      setCurrentProducts(products);
    }
  }
  // Loads products when category filter is selected
  useEffect(() => {
    if (selectedProductFilters.length == 0) {
      fetchCategoryProducts();
    }
    fetchProductFilters();
  }, [categoryFilters, selectedProductFilters]);

  // Loads products by category when page is loaded
  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <Grid container spacing={3}>
      {currentProducts.content &&
        currentProducts.content.map((currentProduct) => {
          return (
            <ProductListItem
              key={currentProduct.id}
              currentProduct={currentProduct}
            />
          );
        })}
    </Grid>
  );
}
