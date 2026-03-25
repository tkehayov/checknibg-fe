import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { PAGES_URL } from "../config";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { DetailedSearchApi } from "../api/detailed-search";
import { SearchFilterList } from "../components/SearchFilterList/SearchFilterList";
import { ProductSearchList } from "../components/ProductSearchList/ProductSearchList";
import { useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function SearchResultPage({ loadingPage }) {
  const breadcrumbs = [
    { key: 1, name: "Home", href: PAGES_URL.home },
    { key: 2, name: "Търсене", href: "" },
  ];
  const theme = useTheme();
  const params = useParams();
  const currentSearchTerm = params.searchTerm;
  const [filters, setFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortSize, setSortSize] = useState("20");
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProductFilters, setSelectedProductFilters] = useState([]);
  const [sortNamePrice, setSortNamePrice] = useState({
    sort: null,
    direction: null,
  });
  const seoTitle = currentSearchTerm
    ? `Резултати за "${currentSearchTerm}" | Chekni.bg`
    : "Търсене на продукти | Chekni.bg";

  async function fetchFiltersBySearchTerm(searchTerm) {
    const filtersResponse =
      await DetailedSearchApi.fetchFiltersBySearchTerm(searchTerm);

    if (filtersResponse) {
      setFilters(filtersResponse);
    }
    return "";
  }

  async function fetchProducts(searchTerm) {
    const productsResponse = await DetailedSearchApi.fetchProducts(searchTerm);

    if (productsResponse) {
      setProducts(productsResponse);
    }
    return "";
  }

  function handlePageChange(page) {
    setPage(page);
    setSearchParams({ page: page });
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
        selectedProductFilters.selectedProductFilters,
      ),
    ]);
  };

  function selectedCategory(currentCategory) {}

  async function fetchCategoryProducts() {
    const productsResponse = await DetailedSearchApi.fetchProductsWithFilters(
      currentSearchTerm,
      selectedProductFilters,
      page,
      sortSize,
      sortNamePrice,
    );
    if (productsResponse) {
      setCurrentProducts(productsResponse);
    }
    return "";
  }

  useEffect(() => {
    if (currentSearchTerm) {
      fetchFiltersBySearchTerm(currentSearchTerm);
      fetchProducts(currentSearchTerm);
      setSelectedProductFilters([]);
    }
  }, [currentSearchTerm]);

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
  }, [selectedProductFilters, currentSearchTerm, sortSize, sortNamePrice]);

  useEffect(() => {
    if (sortNamePrice.sort && sortNamePrice.direction) {
      setPage(1);
    }
  }, [sortNamePrice]);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Header selectedCategory={selectedCategory} breadcrumbs={breadcrumbs} />
      <Grid container sx={{ px: { xs: 2, md: 1 } }} spacing={2}>
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
          <SearchFilterList
            onClickItem={updateSelectedProductFilters}
            filters={filters}
            selectedProductFilters={selectedProductFilters}
            loadingPage={loadingPage}
            sortSize={sortSize}
            setSortSize={setSortSize}
            onSizeChange={(newSize) => setSortSize(newSize)}
            onSortNamePrice={(newSort, newDirection) =>
              setSortNamePrice({ sort: newSort, direction: newDirection })
            }
          />
        </Grid>
        <Grid item md={10} sm={12} xs={12}>
          <h2>Резултати за "{currentSearchTerm}"</h2>
          {products && (
            <ProductSearchList
              currentProducts={currentProducts}
              handlePageChange={handlePageChange}
              sortSize={sortSize}
              onSizeChange={(newSize) => setSortSize(newSize)}
              onSortNamePrice={(newSort, newDirection) =>
                setSortNamePrice({ sort: newSort, direction: newDirection })
              }
            />
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
export default SearchResultPage;
