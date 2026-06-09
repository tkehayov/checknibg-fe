import { Grid } from "@mui/material";
import { Header } from "../components/Header/Header";
import { Banner } from "../components/Banner/Banner";
import React from "react";
import { LazyLoad } from "../components/LazyLoad/LazyLoad";
import { Helmet } from "react-helmet-async";

const popularProducts = { ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
const iphoneProducts = { ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
const laptopProducts = { ids: [1, 2, 3] };

const LazyCarouselAd = React.lazy(
  () => import("../components/Carousel/Carousel"),
);
const LazyFooter = React.lazy(() => import("../components/Footer/Footer"));
export function HomePage() {
  function selectedCategory(currentCategory) {}
  return (
    <>
      <Helmet>
        <title>Chekni.bg - Търси, сравни, купи</title>
        <meta
          name="description"
          content="Намери най-ниската цена в България! Сравни оферти от стотици онлайн магазини. Търси, сравни, купи с Chekni.bg."
        />
      </Helmet>
      <Header selectedCategory={selectedCategory} hideSearch />
      <Grid container>
        <Banner />
      </Grid>
      <Grid container sx={{ px: { xs: 1, md: 0 } }}>
        <Grid item xs={12}>
          <h2>Популярни продукти</h2>
          <LazyLoad
            component={LazyCarouselAd}
            componentProps={popularProducts}
            fallback={
              <div style={{ minHeight: "500px" }}>
                Loading product details...
              </div>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Чекни най-новия Iphone 17</h2>
          <LazyLoad
            component={LazyCarouselAd}
            componentProps={iphoneProducts}
            fallback={
              <div style={{ minHeight: "500px" }}>
                Loading product details...
              </div>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <h2>Чекни най-новите лаптопи</h2>
          <LazyLoad
            component={LazyCarouselAd}
            componentProps={laptopProducts}
            fallback={
              <div style={{ minHeight: "500px" }}>
                Loading product details...
              </div>
            }
          />
        </Grid>
      </Grid>
      <LazyLoad
        component={LazyFooter}
        componentProps={{}}
        fallback={<div style={{ minHeight: "150px" }}></div>}
      />
    </>
  );
}
