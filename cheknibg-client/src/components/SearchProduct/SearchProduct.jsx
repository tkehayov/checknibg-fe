import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { ProductApi } from "../../api/product";
import Autocomplete from "@mui/material/Autocomplete";
import { PAGES_URL } from "../../config";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export function SearchProduct() {
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("md"));

  async function getData(searchTerm) {
    const productResponse = await ProductApi.searchProduct(searchTerm);
    if (productResponse.length !== 0) {
      setOptions(productResponse);
    } else {
      setOptions([]);
    }
  }

  function clickOnProduct(event, value, reason) {
    if (value) {
      navigate(PAGES_URL.product + `/${value.id}`);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
  };

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

  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <Backdrop
        open={isFocused}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(2px)",
          zIndex: 1200 - 1,
          pointerEvents: "none",
        }}
      />
      <Box sx={{ display: "flex" }}>
        <Stack sx={{ width: { xl: 700, lg: 700, md: 400, sm: 300, xs: 300 } }}>
          <Autocomplete
            freeSolo
            options={options}
            filterOptions={(options) => options}
            onInputChange={onInputChange}
            getOptionLabel={(option) => option.name}
            onChange={clickOnProduct}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => theme.palette.primary.main,
                borderRadius: 6,
                borderWidth: 2,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) =>
                  theme.palette.primary.main + " !important",
                borderWidth: "3px",
              },
              "& .MuiInputBase-input": {
                color: (theme) => "#6f767fff",
              },
              zIndex: 1200,
              position: "relative",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Търси в сайта..."
                variant="outlined"
                size={isNotSmall ? "medium" : "small"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                sx={{
                  width: { md: 600, sm: 400, xs: 250 },
                  backgroundColor: "white",
                  borderRadius: 6,
                  "& .MuiInputBase-input::placeholder": {
                    color: "#6f767fff",
                    opacity: 1,
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: (theme) => theme.palette.primary.main }}
                      />
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
export default SearchProduct;
