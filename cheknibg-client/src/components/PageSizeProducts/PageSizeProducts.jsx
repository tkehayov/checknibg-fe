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
        value={sortSize}
        exclusive
        onChange={handleSortSize}
        aria-label="sort size"
        sx={{
          gap: 1,
          height: "28px",
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
              padding: "0px",
              fontSize: "0.95rem",

              "&:hover": {
                margin: "0px",
                paddingTop: "2px",
                background: "transparent",
                color: "primary.main",
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
              },

              "&.Mui-selected": {
                margin: "0px",
                paddingTop: "2px",
                background: "transparent",
                color: "primary.main",
                fontWeight: "bold",
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
