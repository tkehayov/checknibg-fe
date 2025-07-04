import { Container, Grid } from "@mui/material";
import { CarouselAd } from "../components/Carousel/Carousel";
import { Header } from "../components/Header/Header";

export function HomePage() {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item>
          <Header categoryMenu="true" />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <CarouselAd />
        </Grid>
      </Grid>
    </Container>
  );
}
