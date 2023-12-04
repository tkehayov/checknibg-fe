import { Header } from "../components/Header/Header";
import { CategoryFilterList } from "../components/CategoryFilterList/CategoryFilterList";
import { useState, useEffect } from "react";
import { ProductCategoriesApi } from "../api/product-categories.js";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ProductList } from "../components/ProductList/ProductList.jsx";

export function CategoryPage() {
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedProductFilters, setSelectedProductFilters] = useState([]);

  function selectedCategory(currentCategory) {
    if (currentCategory) {
      setCurrentCategory(currentCategory);
    }
  }

  function updateSelectedProductFilters(productFilter, event) {
    if (event.target.checked) {
      setSelectedProductFilters([...selectedProductFilters, productFilter.id]);
    } else {
      const index = selectedProductFilters.indexOf(productFilter.id);
      if (index !== -1) {
        removeProduct(index);
      }
    }
  }

  const removeProduct = (index) => {
    setSelectedProductFilters([
      ...selectedProductFilters.slice(0, index),
      ...selectedProductFilters.slice(
        index + 1,
        selectedProductFilters.selectedProductFilters
      ),
    ]);
  };

  async function fetchCurrentCategory() {
    const url = window.location.pathname.split("/");
    const categoryUrl = url[url.length - 1];

    const category = await ProductCategoriesApi.fetchCategoryByAlias(
      categoryUrl
    );

    if (category) {
      setCurrentCategory(category);
    }
  }

  useEffect(() => {
    if (!currentCategory) {
      fetchCurrentCategory();
    }
  }, []);

  return (
    <div>
      <Header selectedCategory={selectedCategory} />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item md={4} sm={4}>
            {currentCategory && (
              <>
                <h1>hello from category {currentCategory.name}</h1>
                <CategoryFilterList
                  onClickItem={updateSelectedProductFilters}
                  category={currentCategory}
                />
              </>
            )}
          </Grid>
          <Grid item md={8} sm={8}>
            {currentCategory && (
              <ProductList
                categoryFilters={currentCategory}
                selectedProductFilters={selectedProductFilters}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
