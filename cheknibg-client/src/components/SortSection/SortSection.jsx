import { Grid } from "@mui/material";
import { ViewToggle } from "../ViewToggle/ViewToggle";
import PageSizeProducts from "../PageSizeProducts/PageSizeProducts";
import PriceSortProducts from "../PriceSortProducts/PriceSortProducts";

export default function SortSection({
  sortSize,
  onSizeChange,
  onSortNamePrice,
}) {
  return (
    <Grid container justifyContent="flex-end" gap={2}>
      <Grid item>
        <label>Сортиране по:</label>
      </Grid>

      <PriceSortProducts
        onSortNamePrice={onSortNamePrice}
        onSizeChange={onSizeChange}
      />
      <PageSizeProducts sortSize={sortSize} onSizeChange={onSizeChange} />
      <ViewToggle />
    </Grid>
  );
}
