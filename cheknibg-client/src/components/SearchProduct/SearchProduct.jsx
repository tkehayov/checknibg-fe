import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { ProductApi } from "../../api/product";
import Autocomplete from "@mui/material/Autocomplete";
import { PAGES_URL } from "../../config";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";

export function SearchProduct() {
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  async function getData(searchTerm) {
    const productResponse = await ProductApi.searchProduct(searchTerm);
    if (productResponse.length !== 0) {
      setOptions(productResponse);
    } else {
      setOptions([]);
    }
  }

  function clickOnProduct(event, value, reason) {
    navigate(PAGES_URL.product + `/${value.id}`);
  }

  const onInputChange = (event, value, reason) => {
    clearTimeout(timer);
    const trimmedValue = value.trim();
    if (value && trimmedValue.length > 2) {
      value = value.replace(/[^\w\s]/gi, "");

      const newTimer = setTimeout(() => {
        getData(value);
      }, 500);

      setTimer(newTimer);
    } else {
      setOptions([]);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Stack spacing={2} sx={{ width: { xl: 600, md: 400, sm: 300 } }}>
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            options={options}
            filterOptions={(options) => options}
            onInputChange={onInputChange}
            getOptionLabel={(option) => option.name}
            onChange={clickOnProduct}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Търси в сайта"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
}
