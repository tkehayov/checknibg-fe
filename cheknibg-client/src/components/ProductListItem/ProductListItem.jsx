import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  styled,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { API_URLS, PAGES_URL, PRODUCTS_IMAGES_URL } from "../../config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChekniIcon } from "../ChekniIcon/ChekniIcon";
import { useTheme } from "@emotion/react";

export function ProductListItem({ currentProduct, viewMode }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isList = viewMode === "listview" && !isSmallScreen;
  const [imageUrl, setImageUrl] = useState();
  const DEFAULT_BUTTON_TEXT = "Сравни цените";

  const VisuallyHiddenSpan = styled("span")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
    whiteSpace: "nowrap",
  });

  useEffect(() => {
    let imageUrl = "";
    if (currentProduct.images.length > 0) {
      imageUrl = "/" + currentProduct.images[0].filename;
    }
    setImageUrl(imageUrl);
  }, []);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={isList ? 12 : 3}
      lg={isList ? 12 : 3}
      xl={isList ? 12 : 3}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        key={currentProduct.id}
        sx={{
          display: "flex",
          flexDirection: isList ? "row" : "column",
          width: isList ? "100%" : 300,
          height: isList ? 160 : 350,
          justifyContent: "space-between",
          boxShadow: "none",
        }}
      >
        <CardActionArea
          component={Link}
          to={PAGES_URL.product + `/${currentProduct.id}`}
          sx={{
            display: "flex",
            flexDirection: isList ? "row" : "column",
            alignItems: "stretch",
          }}
        >
          {imageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={API_URLS.products + PRODUCTS_IMAGES_URL + `${imageUrl}`}
              alt={currentProduct.name}
              title={currentProduct.name}
              sx={{
                width: isList ? 180 : "100%",
                flexShrink: 0,
                height: isList ? "100%" : 140,
              }}
            />
          )}
          <CardContent
            sx={{
              flex: isList ? "0 0 calc(100% - 260px)" : "unset",
              height: 140,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Typography variant="body3">{currentProduct.name}</Typography>
            <Typography variant="body4" sx={{ marginTop: "auto" }}>
              <p style={{ margin: 0 }}>
                <strong>Цена от: {currentProduct.minPrice}&#8364;</strong>
              </p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            fullWidth
            color="primary"
            sx={{
              flex: isList ? "0 0 260px" : "unset",
              flexGrow: 1,
              color: "#fff",
              borderRadius: 6,
              boxShadow: "none",
              border: (theme) => `1px solid ${theme.palette.primary.main}`,

              "&:hover": {
                backgroundColor: "transparent",
                color: (theme) => theme.palette.primary.main,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                boxShadow: "none",
              },
            }}
            variant="contained"
            component={Link}
            to={PAGES_URL.product + `/${currentProduct.id}`}
          >
            <ChekniIcon />
            <VisuallyHiddenSpan>{DEFAULT_BUTTON_TEXT}</VisuallyHiddenSpan>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
