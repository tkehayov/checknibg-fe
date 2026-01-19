import { Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PageSizeProducts({ sortSize, onSizeChange }) {
  const handleSortSize = (event, newsortSize) => {
    onSizeChange(newsortSize);
  };

  return (
    <Grid item>
      <ToggleButtonGroup
        size="small"
        value={sortSize}
        exclusive
        onChange={handleSortSize}
        aria-label="sort size"
        sx={{
          gap: 0,
          "& .MuiToggleButtonGroup-grouped": {
            border: "none",
            borderRadius: 0,
          },
        }}
      >
        {[20, 40, 60].map((size) => (
          <ToggleButton
            key={size}
            value={size.toString()}
            disableRipple
            sx={{
              marginTop: "-5px",
              fontSize: "0.95rem",
              borderBottom: "2px solid transparent",

              "&:hover": {
                paddingBottom: "9px",
                background: "transparent",
                color: "primary.main",
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
              },

              "&.Mui-selected": {
                background: "transparent",
                color: "primary.main",
                fontWeight: "bold",
                paddingBottom: "9px",
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
                "&:hover": {
                  background: "transparent",
                },
              },
            }}
          >
            {size}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Grid>
  );
}
