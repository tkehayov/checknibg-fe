import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import React, { Suspense, useEffect, useState } from "react";
import { PAGES_URL } from "./config";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import axios from "axios";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Container } from "@mui/material";

const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const SearchResultPage = React.lazy(() => import("./pages/SearchResultPage"));

export function RoutePages() {
  const [loadingPage, setLoadingPage] = useState();

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        setLoadingPage(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (config) => {
        setLoadingPage(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  const LazyFallback = () => (
    <div
      style={{ minHeight: "80vh", textAlign: "center", paddingTop: "100px" }}
    >
      Loading Content...
    </div>
  );
  return (
    <Container maxWidth="xl">
      <ProgressBar show={loadingPage} />

      <Router>
        <Suspense fallback={<LazyFallback />}>
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
              element={<CategoryPage loadingPage={loadingPage} />}
            />
            <Route
              path={PAGES_URL.searchResultPage + "/:searchTerm"}
              exact
              element={<SearchResultPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
      <ScrollToTop />
    </Container>
  );
}
