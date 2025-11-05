import { useLocation, useParams } from "react-router-dom";
import { Header } from "../components/Header/Header";
import React, { useEffect, useState } from "react";
import { ProductApi } from "../api/product";
import { ProductGallery } from "../components/ProductGallery/ProductGallery";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { PAGES_URL } from "../config";
import { Footer } from "../components/Footer/Footer";
import { LazyLoad } from "../components/LazyLoad/LazyLoad";

const LazyProductTabs = React.lazy(() =>
  import("../components/ProductTabs/ProductTabs")
);

export function ProductPage() {
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [breadcrumbs, setBreadcrumbs] = useState();

  async function fetchProduct() {
    const productResponse = await ProductApi.fetchProduct(id);

    if (Object.keys(productResponse).length !== 0) {
      setProduct(productResponse);
      setBreadcrumbs([
        { key: 1, name: "Home", href: PAGES_URL.home },
        {
          key: 2,
          name: productResponse.category.name,
          href: `${PAGES_URL.category}/${productResponse.category.alias}`,
        },
        { key: 3, name: productResponse.name, href: "" },
      ]);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [location]);

  return (
    <div>
      <Header breadcrumbs={breadcrumbs} />

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
              <LazyLoad
                component={LazyProductTabs}
                componentProps={{ product: product }}
                fallback={
                  <div style={{ minHeight: "500px" }}>
                    Loading product details...
                  </div>
                }
              />
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
    </div>
  );
}
export default ProductPage;
