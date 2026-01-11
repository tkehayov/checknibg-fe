import { Grid } from "@mui/material";
import { ViewToggle } from "../ViewToggle/ViewToggle";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
export default function SortSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container justifyContent="flex-end">
      {!isSmallScreen && <ViewToggle />}
    </Grid>
  );
}
