import { ProductCategoriesApi } from "../../api/product-categories";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import { CategoryGroupListItem } from "../CategoryGroupListItem/CategoryGroupListItem";

export function CategoryFilterList({ category, onClickItem, loadingPage }) {
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
  );
}
