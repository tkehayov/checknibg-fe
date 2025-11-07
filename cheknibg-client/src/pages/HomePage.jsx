import { Container, Grid } from "@mui/material";
import { Header } from "../components/Header/Header";
import { Banner } from "../components/Banner/Banner";
import React from "react";
import { LazyLoad } from "../components/LazyLoad/LazyLoad";

const LazyCarouselAd = React.lazy(() =>
  import("../components/Carousel/Carousel")
);
const LazyFooter = React.lazy(() => import("../components/Footer/Footer"));
export function HomePage() {
  function selectedCategory(currentCategory) {}
  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item>
            <Header selectedCategory={selectedCategory} />
          </Grid>
        </Grid>

        <Grid container>
          <Banner />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <h2>Популярни продукти</h2>
            <LazyLoad
              component={LazyCarouselAd}
              componentProps={{
                items: [
                  "laptops.jpg",
                  "slider2.jpg",
                  "slider3.jpg",
                  "laptops.jpg",
                  "laptops.jpg",
                ],
              }}
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
              componentProps={{
                items: [
                  "laptops.jpg",
                  "slider2.jpg",
                  "slider3.jpg",
                  "laptops.jpg",
                  "laptops.jpg",
                ],
              }}
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
              componentProps={{
                items: [
                  "laptops.jpg",
                  "slider2.jpg",
                  "slider3.jpg",
                  "laptops.jpg",
                  "laptops.jpg",
                ],
              }}
              fallback={
                <div style={{ minHeight: "500px" }}>
                  Loading product details...
                </div>
              }
            />
          </Grid>
        </Grid>
      </Container>
      <LazyLoad
        component={LazyFooter}
        componentProps={{}}
        fallback={<div style={{ minHeight: "150px" }}></div>}
      />
    </>
  );
}
