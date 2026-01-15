import { Grid } from "@mui/material";
import { ViewToggle } from "../ViewToggle/ViewToggle";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import PageSizeProducts from "../PageSizeProducts/PageSizeProducts";

export default function SortSection({ sortSize, onSizeChange }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container justifyContent="flex-end" gap={2}>
      {!isSmallScreen && (
        <PageSizeProducts sortSize={sortSize} onSizeChange={onSizeChange} />
      )}

      {!isSmallScreen && <ViewToggle />}
    </Grid>
  );
}
