import { useState } from "react";
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

export function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

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
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
