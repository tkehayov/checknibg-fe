import { Container, Grid } from "@mui/material";
import { CarouselAd } from "../components/Carousel/Carousel";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Banner } from "../components/Banner/Banner";

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
            <CarouselAd />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
