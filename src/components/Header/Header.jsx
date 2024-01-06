import { CategoryMenuList } from "../CategoryMenuList/CategoryMenuList.jsx";
import { ProductCategoriesApi } from "../../api/product-categories.js";
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { SearchProduct } from "../SearchProduct/SearchProduct.jsx";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs.jsx";

export function Header({ selectedCategory, breadcrumbs }) {
  const [productCategories, setProductCategories] = useState();

  async function fetchProductCategories() {
    const productCategoriesResponse =
      await ProductCategoriesApi.fetchCategories();

    if (productCategoriesResponse.length !== 0) {
      setProductCategories(productCategoriesResponse);
    }
  }

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item>
          {productCategories && (
            <CategoryMenuList
              currentCategory={selectedCategory}
              categories={productCategories}
            />
          )}
        </Grid>
        <Grid item>
          <SearchProduct />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
        </Grid>
      </Grid>
    </Container>
  );
}
