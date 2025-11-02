import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SearchProduct } from "../SearchProduct/SearchProduct";

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
        <img
          alt="Smooth hands generic header Jan 2025"
          loading="eager"
          src="/assets/slider/banner.svg"
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
        <SearchProduct />
      </Box>
    </Grid>
  );
}
