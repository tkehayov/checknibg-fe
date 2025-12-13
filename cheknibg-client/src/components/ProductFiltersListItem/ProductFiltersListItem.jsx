import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ChekniIconChecked } from "../CheckBoxIcon/ChekniIconChecked";
import { ChekniIcon } from "../CheckBoxIcon/ChekniIcon";

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
      sx={{
        "& .MuiFormControlLabel-label": {
          fontSize: 15,
        },
      }}
      onChange={onChange_}
      control={
        <Checkbox
          color="primary"
          icon={<ChekniIcon />}
          checkedIcon={<ChekniIconChecked />}
          disabled={loadingPage}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 28 },
            "&:not(.Mui-checked)": {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        />
      }
      label={productFilter.filter}
      checked={isChecked}
    />
  );
}
