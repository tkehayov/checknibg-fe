import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export function ViewToggle() {
  const [alignment, setAlignment] = useState(
    localStorage.getItem("productView") !== "listview" ? "gridview" : "listview"
  );

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    localStorage.setItem("productView", newAlignment);
    window.dispatchEvent(new Event("productView"));
  };
  return (
    <Grid item>
      <ToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        color="primary"
        sx={{
          "& .MuiToggleButton-root": {
            color: (theme) => `${theme.palette.secondary.main}`,
          },
        }}
      >
        <ToggleButton value="gridview" aria-label="right aligned">
          <GridViewRoundedIcon />
        </ToggleButton>
        <ToggleButton value="listview" aria-label="left aligned">
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
