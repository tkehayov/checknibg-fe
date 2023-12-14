import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export function ProductFiltersListItem({
  productFilter,
  onChange,
  loadingPage,
}) {
  const onChange_ = (event) => {
    onChange(productFilter, event);
  };

  return (
    <FormControlLabel
      onChange={onChange_}
      control={<Checkbox disabled={loadingPage} />}
      label={productFilter.filter}
    />
  );
}
