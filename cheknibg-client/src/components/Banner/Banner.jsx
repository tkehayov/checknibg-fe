import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LazyLoad } from "../LazyLoad/LazyLoad";
import React from "react";
const LazySearchProduct = React.lazy(
  () => import("../SearchProduct/SearchProduct"),
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
          srcSet="/assets/slider/CHEKNI-HP-BANNER-XTRA-SMALL-BG.jpeg"
        />
        <source
          media="(max-width: 900px)"
          srcSet="/assets/slider/CHEKNI-HP-BANNER-SMALL-BG.jpeg"
        />
        <source
          media="(max-width: 1200px)"
          srcSet="/assets/slider/CHEKNI-HP-BANNER-MEDIUM-BG.jpeg"
        />
        <img
          alt="Smooth hands generic header Jan 2025"
          loading="eager"
          src="/assets/slider/CHECKNI-HERO-BANNER-BG.jpeg"
          fetchpriority="high"
          width="100%"
          height="100%"
        />
      </picture>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "6%",
          paddingY: { xs: "6%", sm: "5%", md: "4%" },
          gap: { xs: 1, sm: 1.5, md: 2 },
          zIndex: 10,
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "40px",
              sm: "3.5rem",
              md: "75px",
              lg: "5.3125rem",
            },
            fontWeight: "900",
            lineHeight: {
              md: 1.2,
              lg: 1.3,
            },
            letterSpacing: "-0.02em",
            textTransform: "none",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          Чекни
          <Box
            component="span"
            sx={{
              color: "#ffd809",
              fontSize: {
                xs: "30px",
                sm: "3.5rem",
                md: "55px",
                lg: "4.0625rem",
              },
            }}
          >
            Сравни
          </Box>
          <Box
            sx={{
              fontSize: {
                xs: "25px",
                sm: "3.5rem",
                md: "37px",
                lg: "45px",
              },
            }}
          >
            Избери
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { lg: 10, md: 10, sm: 10, xs: 3 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "0.75rem",
                sm: "20px",
                md: "20px",
                lg: "1.5625rem",
              },
              fontWeight: "500",
              lineHeight: 1.3,
              flexShrink: 0,
            }}
          >
            Сравни цените
            <br /> на IT продукти
          </Typography>
          <LazyLoad
            component={LazySearchProduct}
            componentProps={{ isBanner: true }}
            fallback={null}
          />
        </Box>
      </Box>
    </Grid>
  );
}
