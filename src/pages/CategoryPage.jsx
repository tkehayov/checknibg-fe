import { Header } from "../components/Header/Header";
import { useState } from "react";

export function CategoryPage() {
  const [currentCategory, setCurrentCategory] = useState();

  function selectedCategory(currentCategory) {
    if (currentCategory) {
      setCurrentCategory(currentCategory);
    }
  }

  return (
    <div>
      <Header selectedCategory={selectedCategory} />
      {currentCategory && <h1>hello from category {currentCategory.name}</h1>}
    </div>
  );
}
