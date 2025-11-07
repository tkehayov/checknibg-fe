import Carousel from "react-material-ui-carousel";
import { Button, Grid, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function CarouselAd({ items }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const numberPerSlide = isMdUp ? 3 : isSmUp ? 2 : 1;

  const slides = [];
  for (let i = 0; i < items.length; i += numberPerSlide) {
    const chunk = items.slice(i, i + numberPerSlide).map((img) => ({ img }));
    slides.push(chunk);
  }

  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible
      animation="slide"
      indicators={false}
    >
      {slides.map((slide, i) => (
        <Slide key={i} images={slide} numberPerSlide={numberPerSlide} />
      ))}
    </Carousel>
  );
}

function Slide({ images, numberPerSlide }) {
  const mdSize = Math.max(1, Math.floor(12 / numberPerSlide));
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {images.map((it, idx) => (
          <Grid item xs={12} sm={6} md={mdSize} key={idx}>
            <Box
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                boxShadow: 1,
                textAlign: "center",
                bgcolor: "background.paper",
                height: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                src={`/assets/slider/${it.img}`}
                alt={it.img}
                style={{ maxWidth: "100%", maxHeight: 140, objectFit: "cover" }}
              />
              <Box sx={{ px: 1, pt: 1 }}>
                <Button size="small" variant="contained" color="primary">
                  Check it out!
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default CarouselAd;
