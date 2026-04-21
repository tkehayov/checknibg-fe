import { ProductCategoriesApi } from "../../api/product-categories.js";
import { useEffect, useState } from "react";
import { AppBar, Box, Grid, Link, useTheme } from "@mui/material";
import { SearchProduct } from "../SearchProduct/SearchProduct.jsx";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs.jsx";
import { PAGES_URL } from "../../config.js";
import { NavBarHeader } from "../CategoryMenuList/NavBarHeader.jsx";
import { tokens } from "../../theme.js";
import { ReactComponent as Logo } from "../../assets/images/CHEKNI-LOGO.svg";

export function Header({ selectedCategory, breadcrumbs }) {
  const colors = tokens();
  const theme = useTheme();
  const gradient = theme.palette.gradient.main;

  const [navData, setNavData] = useState([{}]);

  const [appBarZIndex, setAppBarZIndex] = useState(1200);

  useEffect(() => {
    const lower = () => setAppBarZIndex(0);
    const restore = () => setAppBarZIndex(1200);
    window.addEventListener("bannerSearchFocus", lower);
    window.addEventListener("bannerSearchBlur", restore);
    return () => {
      window.removeEventListener("bannerSearchFocus", lower);
      window.removeEventListener("bannerSearchBlur", restore);
    };
  }, []);

  async function fetchProductCategories() {
    let categoriesResponse = await ProductCategoriesApi.fetchCategories();
    mapCategoriesResponse(categoriesResponse);
  }

  function mapCategoriesResponse(response) {
    let categoriesData = [];

    response.forEach((categories, index) => {
      let subCat = [];
      categories.filterGroups.forEach((filterGroup) => {
        let items = [];

        filterGroup.productFilters.forEach((productFilter) => {
          items.push({
            name: capitalizeFirstLetter(productFilter.filter),
            id: productFilter.id,
          });
        });

        if (
          filterGroup.name.includes("марка") ||
          filterGroup.name.includes("периферия")
        ) {
          items.unshift({
            name: "Всички",
            id: 0,
          });
        }

        subCat.push({
          title: capitalizeFirstLetter(filterGroup.name),
          items: items,
        });
      });

      categoriesData.push({
        id: categories.id,
        alias: categories.alias,
        main: capitalizeFirstLetter(categories.name),
        sub: subCat,
      });
    });

    if (categoriesData.length > 0) {
      setNavData(categoriesData);
    }
  }

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: `${colors.white[0]}`,
          marginBottom: "10px",
          zIndex: appBarZIndex,
        }}
        elevation={0}
      >
        <Grid
          container
          sx={{
            borderBottom: "3px solid",
            borderImageSlice: 1,
            borderImageSource: `${gradient}`,
          }}
          justifyContent="left"
          alignItems="center"
        >
          {/* LOGO */}
          <Grid
            item
            xl={3}
            md={4}
            xs={12}
            order={{ xl: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Box
              sx={{
                width: {
                  xs: "150px",
                  sm: "150px",
                  md: "150px",
                  lg: "200px",
                },
              }}
            >
              <Link href={PAGES_URL.home}>
                <Logo style={{ width: "100%", height: "auto" }} />
              </Link>
            </Box>
          </Grid>
          {/* SEARCH */}
          <Grid
            item
            xl={6}
            md={8}
            xs={9}
            order={{ xl: 2, md: 2, sm: 3, xs: 3 }}
          >
            <SearchProduct />
          </Grid>
          {/* NAV */}
          {navData.length > 1 && (
            <Grid item order={{ xl: 3, md: 2, sm: 1, xs: 2 }}>
              <NavBarHeader
                navData={navData}
                selectedCategory={selectedCategory}
              />
            </Grid>
          )}
        </Grid>
      </AppBar>
      <Grid container>
        <Grid item>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
        </Grid>
      </Grid>
    </>
  );
}
