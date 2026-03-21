import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Chip, Grid } from "@mui/material";

import { Header } from "../components/Header/Header";
import { CategoryFilterList } from "../components/CategoryFilterList/CategoryFilterList";
import { ProductList } from "../components/ProductList/ProductList.jsx";
import { Footer } from "../components/Footer/Footer.jsx";

import { ProductCategoriesApi } from "../api/product-categories.js";
import { PAGES_URL } from "../config.js";

export function CategoryPage({ loadingPage }) {
  const location = useLocation();
  const locationFilters = location.state?.filters;

  const [currentCategory, setCurrentCategory] = useState();
  const [currentCategoryFilters, setCurrentCategoryFilters] = useState([]);
  const [selectedProductFilters, setSelectedProductFilters] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [productFilterPrice, setProductFilterPrice] = useState({});
  const [selectedProductFilterPrice, setSelectedProductFilterPrice] = useState(
    {},
  );
  const [resetSelectedProductFilters, setResetSelectedProductFilters] =
    useState(false);
  const [sortSize, setSortSize] = useState("20");
  const [sortNamePrice, setSortNamePrice] = useState({
    sort: null,
    direction: null,
  });

  async function fetchCurrentCategory() {
    const url = window.location.pathname.split("/");
    const categoryUrl = url[url.length - 1];
    const category =
      await ProductCategoriesApi.fetchCategoryByAlias(categoryUrl);
    if (category) {
      setCurrentCategory(category);
      selectedCategory(category);
    }
  }

  async function selectedCategory(category) {
    if (!category) return;

    let categoryWithDetails = category;
    if (!category.name) {
      const categoryName = await ProductCategoriesApi.fetchCategoryById(
        category.id,
      );
      categoryWithDetails = { id: category.id, name: categoryName };
    }

    setCurrentCategory(categoryWithDetails);
    setBreadcrumbs([
      { key: 1, name: "Начало", href: PAGES_URL.home },
      { key: 2, name: "Категория", href: "" },
      { key: 3, name: categoryWithDetails.name, href: "" },
    ]);
  }

  async function fetchCategoryFilters(selectedFilters = []) {
    const categoryFilters = await ProductCategoriesApi.fetchCategoryFilters(
      currentCategory.id,
      selectedFilters,
    );
    if (categoryFilters.length > 0) {
      setCurrentCategoryFilters(categoryFilters);
    }
  }

  async function fetchCategoryMinMaxFilterPrice() {
    let filtersToUse = selectedProductFilters;
    if (filtersToUse.length === 0 || filtersToUse[0] === undefined) {
      filtersToUse = currentCategoryFilters.flatMap((cat) =>
        cat.productFilters.map((pf) => pf.id),
      );
    }

    const minMaxPrice =
      await ProductCategoriesApi.fetchCategoryMinMaxFilterPrice(filtersToUse);
    let safeMin = minMaxPrice.minPrice;
    let safeMax = minMaxPrice.maxPrice;

    if (safeMin === null || safeMax === null) {
      safeMin = 0;
      safeMax = 0;
    }
    if (safeMin < 0) safeMin = 0;

    if (safeMin === safeMax && safeMax !== 0) {
      safeMin = Math.max(0, safeMax - 10);
    }
    const sanitizedResult = {
      minPrice: safeMin,
      maxPrice: safeMax,
    };
    setSelectedProductFilterPrice(sanitizedResult);
    setProductFilterPrice(sanitizedResult);

    return sanitizedResult;
  }

  async function loadProductData() {
    if (!currentCategory) return;

    let filtersToUse = selectedProductFilters;
    if (filtersToUse.length === 0 || filtersToUse[0] === undefined) {
      filtersToUse = currentCategoryFilters.flatMap((cat) =>
        cat.productFilters.map((pf) => pf.id),
      );
    }

    const products = await ProductCategoriesApi.fetchProducts(
      filtersToUse,
      page,
      selectedProductFilterPrice.minPrice,
      selectedProductFilterPrice.maxPrice,
      sortSize,
      sortNamePrice,
    );

    if (products) setCurrentProducts(products);
  }

  function updateSelectedProductFilters(productFilter, event) {
    if (productFilter.id === 0) {
      setSelectedProductFilters([]);
      setPage(1);
      return;
    }
    if (resetSelectedProductFilters) {
      setResetSelectedProductFilters(false);
      setSelectedProductFilters([productFilter.id]);
      setPage(1);
      return;
    }
    if (event.target.checked) {
      setSelectedProductFilters([...selectedProductFilters, productFilter.id]);
    } else {
      setSelectedProductFilters(
        selectedProductFilters.filter((id) => id !== productFilter.id),
      );
    }
    setPage(1);
  }

  useEffect(() => {
    fetchCurrentCategory();
  }, []);

  useEffect(() => {
    if (currentCategory) {
      fetchCategoryFilters();
      if (locationFilters !== undefined && locationFilters !== null) {
        setSelectedProductFilters(
          locationFilters === 0 ? [] : [locationFilters],
        );
        setResetSelectedProductFilters(locationFilters !== 0);
      }
    }
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory && currentCategoryFilters.length > 0) {
      fetchCategoryFilters(selectedProductFilters);
    }
  }, [selectedProductFilters]);

  useEffect(() => {
    if (currentCategory && currentCategoryFilters.length > 0) {
      fetchCategoryMinMaxFilterPrice();
    }
  }, [selectedProductFilters, currentCategoryFilters]);

  useEffect(() => {
    if (currentCategory && selectedProductFilterPrice.minPrice !== undefined) {
      loadProductData();
    }
  }, [selectedProductFilterPrice, page, sortSize, sortNamePrice]);

  useEffect(() => {
    if (sortSize) {
      setPage(1);
    }
  }, [sortSize]);

  useEffect(() => {
    if (sortNamePrice.sort && sortNamePrice.direction) {
      setPage(1);
    }
  }, [sortNamePrice]);
  return (
    <>
      <Header selectedCategory={selectedCategory} breadcrumbs={breadcrumbs} />
      <Grid container sx={{ px: { xs: 2, md: 1 } }} spacing={2}>
        <Grid item xs={12}>
          {currentCategory && <h3>Категория {currentCategory.name}</h3>}
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
          sx={{
            position: "sticky",
            top: 115,
            pb: 2,
            zIndex: 100,
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {currentCategoryFilters
              .flatMap((cat) => cat.productFilters)
              .filter((pf) => selectedProductFilters.includes(pf.id))
              .map((pf) => (
                <Chip
                  key={pf.id}
                  variant="outlined"
                  size="small"
                  label={pf.filter}
                  color="primary"
                  onDelete={() =>
                    updateSelectedProductFilters(pf, {
                      target: { checked: false },
                    })
                  }
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            {selectedProductFilters.length > 0 && (
              <Chip
                size="small"
                label="Изчисти филтри"
                variant="filled"
                color="primary"
                onClick={() => updateSelectedProductFilters({ id: 0 }, {})}
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            )}
          </Box>
          {currentCategory && (
            <CategoryFilterList
              onClickItem={updateSelectedProductFilters}
              selectedProductFilters={selectedProductFilters}
              setSelectedProductFilterPrice={setSelectedProductFilterPrice}
              currentCategoryFilters={currentCategoryFilters}
              productFilterPrice={productFilterPrice}
              setPage={setPage}
              page={page}
              sortSize={sortSize}
              onSizeChange={setSortSize}
              onSortNamePrice={(newSort, newDirection) =>
                setSortNamePrice({ sort: newSort, direction: newDirection })
              }
            />
          )}
        </Grid>
        <Grid item md={10} xs={12}>
          <ProductList
            currentProducts={currentProducts}
            setPage={setPage}
            page={page}
            sortSize={sortSize}
            onSizeChange={(newSize) => setSortSize(newSize)}
            onSortNamePrice={(newSort, newDirection) =>
              setSortNamePrice({ sort: newSort, direction: newDirection })
            }
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default CategoryPage;
