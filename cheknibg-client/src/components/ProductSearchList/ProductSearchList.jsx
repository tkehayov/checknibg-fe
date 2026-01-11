import { useState, useEffect } from "react";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { DetailedSearchApi } from "../../api/detailed-search";
import { useSearchParams } from "react-router-dom";
import SortSection from "../SortSection/SortSection";

export function ProductSearchList({ selectedProductFilters, searchTerm }) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");

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
    const checkStorage = () => {
      const val = localStorage.getItem("productView");
      setViewMode(val);
    };
    window.addEventListener("productView", checkStorage);
    checkStorage();
    return () => {
      window.removeEventListener("productView", checkStorage);
    };
  }, []);

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
  }, [selectedProductFilters, searchTerm]);

  return (
    <Grid container spacing={2}>
      <SortSection />

      {currentProducts.content &&
        currentProducts.content.map((product) => {
          return (
            <ProductListItem
              currentProduct={product}
              key={product.id}
              viewMode={viewMode}
            />
          );
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
