import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { PAGES_URL } from "../config";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { DetailedSearchApi } from "../api/detailed-search";
import { SearchFilterList } from "../components/SearchFilterList/SearchFilterList";
import { ProductSearchList } from "../components/ProductSearchList/ProductSearchList";

export function SearchResultPage({ loadingPage }) {
  const breadcrumbs = [
    { key: 1, name: "Home", href: PAGES_URL.home },
    { key: 2, name: "Търсене", href: "" },
  ];
  const params = useParams();
  const currentSearchTerm = params.searchTerm;
  const [filters, setFilters] = useState([]);
  const [products, setProducts] = useState([]);
  const [resetSelectedProductFilters, setResetSelectedProductFilters] =
    useState(false);
  const [selectedProductFilters, setSelectedProductFilters] = useState([]);

  async function fetchFiltersBySearchTerm(searchTerm) {
    const filtersResponse = await DetailedSearchApi.fetchFiltersBySearchTerm(
      searchTerm
    );

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

  function selectedCategory(currentCategory) {}

  useEffect(() => {
    if (currentSearchTerm) {
      fetchFiltersBySearchTerm(currentSearchTerm);
      fetchProducts(currentSearchTerm);
    }
  }, [currentSearchTerm]);

  return (
    <>
      <Header selectedCategory={selectedCategory} breadcrumbs={breadcrumbs} />
      <Grid container sx={{ px: { xs: 2, md: 0 } }}>
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
          />
        </Grid>
        <Grid item md={10} sm={12} xs={12}>
          <h2>Резултати за "{currentSearchTerm}"</h2>
          {products && (
            <ProductSearchList
              searchTerm={currentSearchTerm}
              products={products}
              selectedProductFilters={selectedProductFilters}
            />
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
export default SearchResultPage;
