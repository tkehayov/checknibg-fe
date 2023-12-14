import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export function ProgressBar({ show }) {
  return (
    show && (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    )
  );
}
