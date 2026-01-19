import { useState, useEffect } from "react";
import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import SortSection from "../SortSection/SortSection";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export function ProductSearchList({
  currentProducts,
  handlePageChange,
  sortSize,
  onSizeChange,
  onSortNamePrice,
}) {
  const [viewMode, setViewMode] = useState("grid");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
      {!isSmallScreen && (
        <SortSection
          sortSize={sortSize}
          onSizeChange={onSizeChange}
          onSortNamePrice={onSortNamePrice}
        />
      )}

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
