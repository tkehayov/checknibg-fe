import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { HelmetProvider } from "react-helmet-async";
import { RoutePages } from "./RoutePages";
export function App() {
  const [theme, colorMode] = useMode("light");

  return (
    <HelmetProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RoutePages />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </HelmetProvider>
  );
}

export default App;
