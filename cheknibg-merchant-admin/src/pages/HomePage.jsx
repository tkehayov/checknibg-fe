import { Box, useTheme } from "@mui/material";
import { HeaderContent } from "../components/HeaderContent";
import { tokens } from "../theme";
import { StatBoxTotalClicks } from "../components/StatBoxTotalClicks";
import AdsClickIcon from "@mui/icons-material/AdsClick";

export function HomePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <HeaderContent title="Начало" subtitle="Начало" />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxTotalClicks
            subtitle="Брой кликове"
            icon={
              <AdsClickIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
}
