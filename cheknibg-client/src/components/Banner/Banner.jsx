import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LazyLoad } from "../LazyLoad/LazyLoad";
import React from "react";
const LazySearchProduct = React.lazy(() =>
  import("../SearchProduct/SearchProduct")
);

export function Banner() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        position: "relative",
      }}
    >
      <picture>
        <source
          media="(max-width: 600px)"
          srcset="/assets/slider/CHEKNI-HP-BANNER-XSMALL.webp"
        />
        <source
          media="(max-width: 900px)"
          srcset="/assets/slider/CHEKNI-HP-BANNER-SMALL.webp"
        />
        <source
          media="(max-width: 1200px)"
          srcset="/assets/slider/CHEKNI-HP-BANNER-MEDIUM.webp"
        />
        <img
          alt="Smooth hands generic header Jan 2025"
          loading="eager"
          src="/assets/slider/CHEKNI-HP-BANNER-LARGE.webp"
          fetchpriority="high"
          width="100%"
          height="100%"
        />
      </picture>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "3%",
          zIndex: 10,
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "25px",
              md: "30px",
              lg: "40px",
            },
            fontWeight: "900",
          }}
        >
          ТЪРСИ, СРАВНИ, КУПИ
        </Typography>
        <br />
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "20px",
              md: "27px",
              lg: "32px",
            },
            fontWeight: "900",
          }}
        >
          Твоят IT продукт на най-добра цена.
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "65%",
          left: "3%",
        }}
      >
        <LazyLoad
          component={LazySearchProduct}
          componentProps={{}}
          fallback={null}
        />
      </Box>
    </Grid>
  );
}
