import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PAGES_URL } from "./config";
import { FileImportProductsPage } from "./pages/FileImportProductsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
import { AuthApi, getAuthToken } from "./api/auth-api";
// import { baseURL } from "../utils/config";

export function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  function changeSidebar(sidebar) {
    setIsSidebar(sidebar);
  }

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        let token = getAuthToken();
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("ASdf", token);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (config) => {
        console.log("ASdf22");
        return config;
      },
      (error) => {
        let token = getAuthToken();
        const status = error?.response?.status || 0;
        const resBaseURL = error?.response?.config?.baseURL;
        if (status === 401) {
          console.log("ASdfqqq111", token);

          if (token) {
            // console.log("ASdfqqq");

            // localStorage.clear();
            // window.location.assign("/");
            return Promise.reject(error);
          } else {
            return Promise.reject(error);
          }
        }
      }
    );
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Routes>
              <Route path={PAGES_URL.home} element={<HomePage />} />
              <Route path={PAGES_URL.products} element={<ProductPage />} />
              <Route
                path={PAGES_URL.import}
                element={<FileImportProductsPage />}
              />
              <Route path={PAGES_URL.settings} element={<SettingsPage />} />
              <Route
                path={PAGES_URL.login}
                element={<LoginPage changeSidebar={changeSidebar} />}
              />
              <Route
                path={PAGES_URL.register}
                element={<RegisterPage changeSidebar={changeSidebar} />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
