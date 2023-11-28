import { Header } from "../components/Header/Header";
import { useState, useEffect } from "react";
import { ProductCategoriesApi } from "../api/product-categories.js";

export function CategoryPage() {
  const [currentCategory, setCurrentCategory] = useState();

  function selectedCategory(currentCategory) {
    if (currentCategory) {
      setCurrentCategory(currentCategory);
    }
  }

  async function fetchCurrentCategory() {
    const url = window.location.pathname.split("/");
    const categoryUrl = url[url.length - 1];

    const category = await ProductCategoriesApi.fetchCategoryByAlias(
      categoryUrl
    );

    if (category) {
      setCurrentCategory(category);
    }
  }

  useEffect(() => {
    if (!currentCategory) {
      fetchCurrentCategory();
    }
  }, []);

  return (
    <div>
      <Header selectedCategory={selectedCategory} />
      {currentCategory && <h1>hello from category {currentCategory.name}</h1>}
    </div>
  );
}
