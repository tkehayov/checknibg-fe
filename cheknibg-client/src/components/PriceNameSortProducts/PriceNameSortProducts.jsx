import { useState } from "react";
import { Grid } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const PriceNameSortProducts = ({ onSortNamePrice }) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [direction, setDirection] = useState("asc");
  const handleSort = (event, newSort) => {
    const effectiveSort = newSort || sortOrder;
    if (effectiveSort === sortOrder) {
      const newDir = direction === "asc" ? "desc" : "asc";
      setDirection(newDir);
      if (onSortNamePrice) onSortNamePrice(effectiveSort, newDir);
    } else {
      setSortOrder(effectiveSort);
      setDirection("asc");
      if (onSortNamePrice) onSortNamePrice(effectiveSort, "asc");
    }
  };

  return (
    <Grid item>
      <ToggleButtonGroup
        size="small"
        value={sortOrder}
        exclusive
        onChange={handleSort}
        sx={{
          "& .MuiToggleButton-root": {
            color: (theme) => theme.palette.secondary.main,
            textTransform: "none",
            "&.Mui-selected": {
              color: (theme) => theme.palette.secondary.main,
              background: "transparent",
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          },
        }}
      >
        <ToggleButton value="nameSort">
          <strong>Име</strong>
          {(sortOrder === "priceSort" || sortOrder === null) && (
            <ArrowUpwardIcon fontSize="small" />
          )}
          {sortOrder === "nameSort" &&
            (direction === "asc" ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            ))}
        </ToggleButton>
        <ToggleButton value="priceSort">
          <strong>Цена</strong>
          {(sortOrder === "nameSort" || sortOrder === null) && (
            <ArrowUpwardIcon fontSize="small" />
          )}
          {sortOrder === "priceSort" &&
            (direction === "asc" ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            ))}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
};

export default PriceNameSortProducts;
