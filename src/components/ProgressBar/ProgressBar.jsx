import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export function ProgressBar({ show }) {
  return (
    show && (
      <Box sx={{ width: "100%", position: "fixed", zIndex: "9999" }}>
        <LinearProgress />
      </Box>
    )
  );
}
