import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import { API_URLS, PAGES_URL, PRODUCTS_IMAGES_URL } from "../../config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChekniIcon } from "../ChekniIcon/ChekniIcon";

export function ProductListItem({ currentProduct }) {
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
      md={3}
      lg={3}
      xl={3}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        key={currentProduct.id}
        sx={{
          width: 300,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea>
          {imageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={API_URLS.products + PRODUCTS_IMAGES_URL + `${imageUrl}`}
              alt={currentProduct.name}
              title={currentProduct.name}
            />
          )}
          <CardContent sx={{ height: 80 }}>
            <Typography variant="body3">{currentProduct.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            fullWidth
            color="primary"
            sx={{
              color: "#fff",
              borderRadius: 6,
              "&:hover": {
                backgroundColor: "transparent",
                color: (theme) => theme.palette.primary.main,
                border: (theme) => `2px solid ${theme.palette.primary.main}`,
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
