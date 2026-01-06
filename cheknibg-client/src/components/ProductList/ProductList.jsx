import { ProductListItem } from "../ProductListItem/ProductListItem";
import Grid from "@mui/material/Grid";
import { PaginationComponent } from "../Pagination/PaginationComponent";

export function ProductList({ currentProducts, setPage, page }) {
  function handlePageChange(page) {
    setPage(page);
  }

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
