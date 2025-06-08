import { ProductCategoriesApi } from "../../api/product-categories.js";
import { useEffect, useState } from "react";
import { AppBar, Grid, Link } from "@mui/material";
import { SearchProduct } from "../SearchProduct/SearchProduct.jsx";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs.jsx";
import logoSrc from "../../assets/images/CHEKNI-LOGO.svg";
import { PAGES_URL } from "../../config.js";
import { NavBarHeader } from "../CategoryMenuList/NavBarHeader.jsx";

export function Header({ selectedCategory, breadcrumbs, categoryMenu }) {
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
    <AppBar position="sticky" color="default" elevation={1}>
      <Grid container>
        <Grid item>
          <Link href={PAGES_URL.home}>
            <img src={logoSrc} alt="Chekni logo" width={200} />
          </Link>
        </Grid>
        <Grid item>
          <SearchProduct />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <NavBarHeader />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
        </Grid>
      </Grid>
    </AppBar>
  );
}
