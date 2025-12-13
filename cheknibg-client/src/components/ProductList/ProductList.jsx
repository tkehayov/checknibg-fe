import { useState, useEffect } from "react";
import { ProductCategoriesApi } from "../../api/product-categories";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";

export function ProductList({ categoryFilters, selectedProductFilters }) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchProductFilters() {
    const products = await ProductCategoriesApi.fetchProductFilters(
      selectedProductFilters,
      page
    );

    if (products) {
      setCurrentProducts(products);
    }
  }

  async function fetchCategoryProducts() {
    const products = await ProductCategoriesApi.fetchCategoryProducts(
      categoryFilters.id,
      page
    );

    if (products) {
      setCurrentProducts(products);
    }
  }

  function handlePageChange(page) {
    setPage(page);
  }

  // Loads products when category filter is selected
  useEffect(() => {
    if (selectedProductFilters.length === 0) {
      fetchCategoryProducts();
      return;
    }
    fetchProductFilters();
  }, [page]);

  useEffect(() => {
    handlePageChange(1);

    if (selectedProductFilters.length === 0) {
      fetchCategoryProducts();
      return;
    }

    fetchProductFilters();
  }, [selectedProductFilters]);

  return (
    <Grid container spacing={2}>
      {currentProducts.content &&
        currentProducts.content.map((currentProduct) => {
          return (
            <ProductListItem
              key={currentProduct.id}
              currentProduct={currentProduct}
            />
          );
        })}
      <Grid container justifyContent="flex-end">
        <Grid item>
          {currentProducts.content && (
            <PaginationComponent
              elements={currentProducts}
              handlePageChange={handlePageChange}
              pages={page}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
