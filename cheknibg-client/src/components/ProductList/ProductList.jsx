import { useState, useEffect } from "react";
import { ProductCategoriesApi } from "../../api/product-categories";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";

export function ProductList({ categoryFilters, selectedProductFilters }) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isPageCleared, setIsPageCleared] = useState(false);

  async function fetchProductFilters() {
    const products = await ProductCategoriesApi.fetchProductFilters(
      categoryFilters.id,
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

  function changeClearPagination(isPageCleared) {
    setIsPageCleared(isPageCleared);
  }

  // Loads products when category filter is selected
  useEffect(() => {
    if (selectedProductFilters.length == 0) {
      fetchCategoryProducts();
      return;
    }
    changeClearPagination(true);
    fetchProductFilters();
  }, [categoryFilters, selectedProductFilters]);

  useEffect(() => {
    if (selectedProductFilters.length == 0) {
      fetchCategoryProducts();
      return;
    }
    changeClearPagination(false);
    fetchProductFilters();
  }, [page]);

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
      <Grid container justifyContent="flex-end">
        <Grid item>
          {currentProducts.content && (
            <PaginationComponent
              elements={currentProducts}
              handlePageChange={handlePageChange}
              isPageCleared={isPageCleared}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
