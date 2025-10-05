import { Header } from "../components/Header/Header";
import { CategoryFilterList } from "../components/CategoryFilterList/CategoryFilterList";
import { useState, useEffect } from "react";
import { ProductCategoriesApi } from "../api/product-categories.js";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ProductList } from "../components/ProductList/ProductList.jsx";
import { PAGES_URL } from "../config.js";
import { useLocation } from "react-router-dom";
import { Footer } from "../components/Footer/Footer.jsx";

export function CategoryPage({ loadingPage }) {
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedProductFilters, setSelectedProductFilters] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState();

  const location = useLocation();
  const locationFilters = location.state?.filters;
  const [resetSelectedProductFilters, setResetSelectedProductFilters] =
    useState(false);

  function selectedCategory(currentCategory) {
    if (currentCategory) {
      setCurrentCategory(currentCategory);
      setBreadcrumbs([
        { key: 1, name: "Home", href: PAGES_URL.home },
        { key: 2, name: currentCategory.name, href: "" },
      ]);
    }
  }

  function updateSelectedProductFilters(productFilter, event) {
    if (resetSelectedProductFilters) {
      setResetSelectedProductFilters(false);
      setSelectedProductFilters([productFilter.id]);
      return;
    }

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

  useEffect(() => {
    if (locationFilters) {
      setSelectedProductFilters([locationFilters]);
      setResetSelectedProductFilters(true);
    }
  }, [locationFilters]);

  return (
    <>
      <Header selectedCategory={selectedCategory} breadcrumbs={breadcrumbs} />
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item md={3} sm={4}>
            {currentCategory && (
              <>
                <h3>Категория {currentCategory.name}</h3>
                <CategoryFilterList
                  onClickItem={updateSelectedProductFilters}
                  category={currentCategory}
                  loadingPage={loadingPage}
                />
              </>
            )}
          </Grid>
          <Grid item md={9} sm={8}>
            {currentCategory && (
              <ProductList
                categoryFilters={currentCategory}
                selectedProductFilters={selectedProductFilters}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
