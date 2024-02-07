import { Box, useTheme } from "@mui/material";
import { HeaderContent } from "../components/HeaderContent";
import { tokens } from "../theme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SettingsProductImport } from "../components/SettingsProductImport";

export function SettingsPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <HeaderContent title="Настройки" subtitle="Настройки на потребителя" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Импорт на продукти
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Начин на импорт:</Typography>
          <SettingsProductImport />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
