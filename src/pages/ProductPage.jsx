import { useParams } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { useEffect, useState } from "react";
import { ProductApi } from "../api/product";
import { ProductGallery } from "../components/ProductGallery/ProductGallery";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import ProductTabs from "../components/ProductTabs/ProductTabs";

export function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState();

  async function fetchProduct() {
    const productResponse = await ProductApi.fetchProduct(id);

    if (Object.keys(productResponse).length !== 0) {
      setProduct(productResponse);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <Header />

      {product && (
        <Container>
          <h1>ProductPage</h1>

          <Grid container spacing={3}>
            <Grid item md={5} sm={4}>
              <ProductGallery images={product.images} />
            </Grid>
            <Grid item md={7}>
              {product.name}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={4}>
              <ProductTabs product={product} />
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
