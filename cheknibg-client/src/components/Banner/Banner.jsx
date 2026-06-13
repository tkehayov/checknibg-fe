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
        borderRadius: 5,
        overflow: "hidden",
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
          paddingLeft: { xs: "4%", md: "5%", lg: "6%" },
          paddingY: { xs: "6%", sm: "5%", md: "4%" },
          gap: { xs: 1, sm: 2, md: 3 },
          zIndex: 10,
          color: "white",
        }}
      >
        {/* Line 1 */}
        <Box
          component="h1"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: { xs: "6px", md: "12px" },
            fontWeight: "900",
            fontSize: {
              xs: "28px",
              sm: "36px",
              md: "48px",
              lg: "60px",
              xl: "72px",
            },
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: 0,
            textShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        >
          <Box component="span">Чекни,</Box>
          <Box component="span" sx={{ color: "#ffd809" }}>
            Сравни,
          </Box>
          <Box component="span">Избери</Box>
        </Box>

        {/* Line 2 */}
        <Typography
          component="h2"
          sx={{
            fontSize: {
              xs: "16px",
              sm: "22px",
              md: "32px",
              lg: "44px",
              xl: "52px",
            },
            fontWeight: "700",
            lineHeight: 1.2,
            color: "#fff",
            margin: 0,
            textShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        >
          Сравни цените на IT продукти
        </Typography>

        {/* Line 3: search */}
        <LazyLoad
          component={LazySearchProduct}
          componentProps={{ isBanner: true }}
          fallback={null}
        />
      </Box>
    </Grid>
  );
}
