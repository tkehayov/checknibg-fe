import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import SortSection from "../SortSection/SortSection";
import { useEffect, useState } from "react";

export function ProductList({ currentProducts, setPage, page }) {
  const [viewMode, setViewMode] = useState("grid");

  function handlePageChange(page) {
    setPage(page);
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

  return (
    <Grid container spacing={2}>
      <SortSection />
      {currentProducts.content &&
        currentProducts.content.map((currentProduct) => {
          return (
            <ProductListItem
              key={currentProduct.id}
              currentProduct={currentProduct}
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
              pages={page}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
