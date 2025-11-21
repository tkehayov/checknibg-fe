import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export function ProductFiltersListItem({
  productFilter,
  onChange,
  loadingPage,
  selectedProductFilters,
}) {
  const onChange_ = (event) => {
    onChange(productFilter, event);
  };
  const isChecked = selectedProductFilters?.includes(productFilter?.id);

  return (
    <FormControlLabel
      onChange={onChange_}
      control={<Checkbox disabled={loadingPage} />}
      label={productFilter.filter}
      checked={isChecked}
    />
  );
}
