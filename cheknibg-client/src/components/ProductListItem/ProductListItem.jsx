import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { API_URLS, PAGES_URL, PRODUCTS_IMAGES_URL } from "../../config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProductListItem({ currentProduct }) {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    let imageUrl = "/" + currentProduct.images[0].filename;
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
          maxWidth: 350,
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
              fontWeight: 900,
            }}
            variant="contained"
            component={Link}
            to={PAGES_URL.product + `/${currentProduct.id}`}
          >
            CHEKN✔
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
