import { ProductCategoriesApi } from "../../api/product-categories.js";
import { useEffect, useState } from "react";

export function Header() {
  const [productCategories, setProductCategories] = useState();

  async function fetchProductCategories() {
    const productCategoriesResponse =
      await ProductCategoriesApi.fetchCategories();

    if (Object.keys(productCategoriesResponse).length !== 0) {
      setProductCategories(productCategoriesResponse);
    }
  }

  useEffect(() => {
    fetchProductCategories();
  }, []);

  console.log(productCategories);

  return (
    <div>
      <h1>this is simple header</h1>
    </div>
  );
}
