import { useParams } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { useEffect, useState } from "react";
import { ProductApi } from "../api/product";

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
      <h1>ProductPage</h1>
      {product && <p>{product.name}</p>}
    </div>
  );
}
