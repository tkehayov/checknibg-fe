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

      <Grid container spacing={1} sx={{ px: { xs: 2, md: 0 } }}>
        <Grid item md={12} xs={12} sm={12}>
          {currentCategory && <h3>Категория {currentCategory.name}</h3>}
        </Grid>
        {/* Filter Section */}
        <Grid
          item
          md={2}
          xs={12}
          sm={12}
          sx={{
            position: "sticky",
            top: 115,
            backgroundColor: "white",
            zIndex: 100,
            paddingBottom: 2,
          }}
        >
          {currentCategory && (
            <>
              <CategoryFilterList
                onClickItem={updateSelectedProductFilters}
                category={currentCategory}
                loadingPage={loadingPage}
                selectedProductFilters={selectedProductFilters}
              />
            </>
          )}
        </Grid>
        {/* Products Section */}
        <Grid item md={10} sm={12} xs={12}>
          {currentCategory && (
            <ProductList
              categoryFilters={currentCategory}
              selectedProductFilters={selectedProductFilters}
            />
          )}
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
export default CategoryPage;
