import { CategoryMenuList } from "../CategoryMenuList/CategoryMenuList.jsx";
import { ProductCategoriesApi } from "../../api/product-categories.js";
import { useEffect, useState } from "react";

export function Header() {
  const [productCategories, setProductCategories] = useState();

  async function fetchProductCategories() {
    const productCategoriesResponse =
      await ProductCategoriesApi.fetchCategories();

    if (productCategoriesResponse.length !== 0) {
      setProductCategories(productCategoriesResponse);
    }
  }

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <div>
      {productCategories && <CategoryMenuList categories={productCategories} />}
    </div>
  );
}
