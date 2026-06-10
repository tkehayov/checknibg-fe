import { ProductCategoriesApi } from "../../api/product-categories.js";
import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchProduct } from "../SearchProduct/SearchProduct.jsx";
import { SearchOverlay } from "../SearchProduct/SearchOverlay.jsx";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs.jsx";
import { PAGES_URL } from "../../config.js";
import { NavBarHeader } from "../CategoryMenuList/NavBarHeader.jsx";
import { tokens } from "../../theme.js";
import { ReactComponent as Logo } from "../../assets/images/CHEKNI-LOGO.svg";

export function Header({ selectedCategory, breadcrumbs, hideSearch = false }) {
  const colors = tokens();
  const theme = useTheme();
  const gradient = theme.palette.gradient.main;
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [navData, setNavData] = useState([{}]);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);

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
            lg={4}
            xs={true}
            order={{ xl: 1, md: 2, sm: 2, xs: 2 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-start" },
            }}
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
          {/* SEARCH — always visible on mobile; hidden on desktop when hideSearch */}
          <Grid
            item
            xl={6}
            lg={8}
            xs="auto"
            order={{ xl: 2, md: 2, sm: 3, xs: 3 }}
            sx={{
              display: { xs: "flex", lg: hideSearch ? "none" : "flex" },
              alignItems: "center",
              justifyContent: { xs: "flex-end", lg: "flex-start" },
            }}
          >
            {isDesktop ? (
              <SearchProduct />
            ) : (
              <IconButton
                onClick={() => setSearchOverlayOpen(true)}
                aria-label="open search"
                size="large"
              >
                <SearchIcon sx={{ fontSize: 28, color: "text.primary" }} />
              </IconButton>
            )}
          </Grid>

          {/* Full-screen search overlay (mobile / tablet only) */}
          {!isDesktop && (
            <SearchOverlay
              open={searchOverlayOpen}
              onClose={() => setSearchOverlayOpen(false)}
            />
          )}
          {/* NAV */}
          {navData.length > 1 && (
            <Grid item order={{ xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}>
              <NavBarHeader
                navData={navData}
                selectedCategory={selectedCategory}
              />
            </Grid>
          )}
        </Grid>
      </AppBar>
      <Grid container sx={{ pl: { xs: 2, md: 1 } }}>
        <Grid item>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
        </Grid>
      </Grid>
    </>
  );
}
