import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { RoutePages } from "./RoutePages";
export function App() {
  const [theme, colorMode] = useMode("light");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutePages />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
