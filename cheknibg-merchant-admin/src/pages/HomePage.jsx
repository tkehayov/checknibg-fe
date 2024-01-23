import { Box, useTheme } from "@mui/material";
import { HeaderContent } from "../components/HeaderContent";
import { tokens } from "../theme";

export function HomePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <HeaderContent title="Начало" subtitle="Начало" />
    </Box>
  );
}
