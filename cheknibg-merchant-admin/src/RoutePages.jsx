// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { HomePage } from "./pages/HomePage";
// import { NotFoundPage } from "./pages/NotFoundPage";
// import { ProductPage } from "./pages/ProductPage";
// import { CategoryPage } from "./pages/CategoryPage";
// import { PAGES_URL } from "./config";
// import { ProgressBar } from "./components/ProgressBar/ProgressBar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Container } from "@mui/material";
export function RoutePages() {
  // const [loadingPage, setLoadingPage] = useState();

  // useEffect(() => {
  //   axios.interceptors.request.use(
  //     (config) => {
  //       setLoadingPage(true);
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   axios.interceptors.response.use(
  //     (config) => {
  //       setLoadingPage(false);
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);
  return <h1>"asdf"</h1>;
  // <Container>
  //   <ProgressBar show={loadingPage} />
  //   <Router>
  //     <Routes>
  //       <Route path={PAGES_URL.home} exact element={<HomePage />} />
  //       <Route
  //         path={PAGES_URL.product + "/:id"}
  //         exact
  //         element={<ProductPage />}
  //       />
  //       <Route
  //         path={PAGES_URL.category + "/:id"}
  //         exact
  //         element={<CategoryPage loadingPage={loadingPage} />}
  //       />
  //       <Route path="*" element={<NotFoundPage />} />
  //     </Routes>
  //   </Router>
  //   <ScrollToTop />
  // </Container>
}
