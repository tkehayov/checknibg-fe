import { useState, useEffect } from "react";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { DetailedSearchApi } from "../../api/detailed-search";
import { useSearchParams } from "react-router-dom";

export function ProductSearchList({ selectedProductFilters, searchTerm }) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  function handlePageChange(page) {
    setPage(page);
    setSearchParams({ page: page });
  }

  async function fetchCategoryProducts() {
    const productsResponse = await DetailedSearchApi.fetchProductsWithFilters(
      searchTerm,
      selectedProductFilters,
      page
    );
    if (productsResponse) {
      setCurrentProducts(productsResponse);
    }
    return "";
  }

  useEffect(() => {
    if (selectedProductFilters) {
      fetchCategoryProducts();
    }
  }, [page]);

  useEffect(() => {
    handlePageChange(1);
    if (selectedProductFilters.length === 0) {
      fetchCategoryProducts();
      return;
    }
    fetchCategoryProducts();
  }, [selectedProductFilters]);

  return (
    <Grid container spacing={2}>
      {currentProducts.content &&
        currentProducts.content.map((product) => {
          return <ProductListItem currentProduct={product} key={product.id} />;
        })}
      <Grid container justifyContent="flex-end">
        <Grid item>
          {currentProducts.content && (
            <PaginationComponent
              elements={currentProducts}
              handlePageChange={handlePageChange}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
