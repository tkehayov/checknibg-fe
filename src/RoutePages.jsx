import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductPage } from "./pages/ProductPage";
import { CategoryPage } from "./pages/CategoryPage";
import { PAGES_URL } from "./config";
export function RoutePages() {
  return (
    <Router>
      <Routes>
        <Route path={PAGES_URL.home} exact element={<HomePage />} />
        <Route
          path={PAGES_URL.product + "/:id"}
          exact
          element={<ProductPage />}
        />
        <Route
          path={PAGES_URL.category + "/:id"}
          exact
          element={<CategoryPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
