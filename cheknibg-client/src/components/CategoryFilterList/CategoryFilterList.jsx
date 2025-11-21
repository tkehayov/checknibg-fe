import { ProductCategoriesApi } from "../../api/product-categories";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import { CategoryGroupListItem } from "../CategoryGroupListItem/CategoryGroupListItem";
import { Box } from "@mui/material";
import ProductFilterDrawer from "../ProductFilterDrawer/ProductFilterDrawer";

export function CategoryFilterList({
  category,
  onClickItem,
  loadingPage,
  selectedProductFilters,
}) {
  const [currentCategoryFilters, setCurrentCategoryFilters] = useState([]);

  useEffect(() => {
    async function fetchCategoryFilters() {
      const categoryFilters = await ProductCategoriesApi.fetchCategoryFilters(
        category.id
      );

      if (categoryFilters.length > 0) {
        setCurrentCategoryFilters(categoryFilters);
      }
    }
    fetchCategoryFilters();
  }, [category]);

  return (
    <>
      <Box sx={{ display: { md: "none" } }}>
        <ProductFilterDrawer
          currentCategoryFilters={currentCategoryFilters}
          onClickItem={onClickItem}
          loadingPage={loadingPage}
          selectedProductFilters={selectedProductFilters}
        />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <FormGroup>
          {currentCategoryFilters.map((filter) => {
            return (
              <div key={filter.id}>
                <CategoryGroupListItem
                  onChangeProductItem={onClickItem}
                  filter={filter}
                  loadingPage={loadingPage}
                />
              </div>
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
}
