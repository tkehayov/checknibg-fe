import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { ProductApi } from "../../api/product";
import Autocomplete from "@mui/material/Autocomplete";
import {
  API_URLS,
  PAGES_URL,
  PRODUCTS_IMAGES_URL,
  PRODUCTS_IMAGES_URL_THUMBNAILS,
} from "../../config";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  IconButton,
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
  const [isFocused, setIsFocused] = useState(false);
  const [zIndexText, setZIndexText] = useState(1000);
  const [zIndexBackdrop, setZIndexBackdrop] = useState(999);
  const [searchTerm, setSearchTerm] = useState("");

  async function getData(searchTerm) {
    const productResponse = await ProductApi.searchProduct(searchTerm);
    if (productResponse.length !== 0) {
      setOptions(productResponse);
    } else {
      setOptions([]);
    }
  }

  function clickOnProduct(event, value, reason) {
    if (event.key !== "Enter" && value) {
      navigate(PAGES_URL.product + `/${value.id}`);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchTerm.length > 2) {
        setIsFocused(false);
        navigate(PAGES_URL.searchResultPage + `/${searchTerm}`);
      }
    }
  };

  const onInputChange = (event, value, reason) => {
    clearTimeout(timer);
    const trimmedValue = value.trim();
    setSearchTerm(trimmedValue);
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

  const handleSearchClick = (event) => {
    if (searchTerm.length > 2) {
      setIsFocused(false);
      navigate(PAGES_URL.searchResultPage + `/${searchTerm}`);
    }
  };

  return (
    <>
      <Backdrop
        open={isFocused}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(2px)",
          zIndex: zIndexBackdrop,
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
            getOptionLabel={(option) => {
              // If option is an object (a structured product), return its name
              if (
                typeof option === "object" &&
                option !== null &&
                option.name
              ) {
                return option.name;
              }
              // If option is a string (free solo input), return the string itself
              return String(option);
            }}
            onChange={clickOnProduct}
            onKeyDown={handleKeyDown}
            renderOption={(props, option) => {
              const src =
                option &&
                typeof option === "object" &&
                (option.image || option.imageUrl || option.thumbnail);
              return (
                <li
                  {...props}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="img"
                    src={
                      src ||
                      API_URLS.products +
                        PRODUCTS_IMAGES_URL_THUMBNAILS +
                        "/" +
                        option.images[0].filename
                    }
                    alt={
                      typeof option === "object" ? option.name : String(option)
                    }
                    sx={{
                      width: 40,
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: 1,
                      mr: 1,
                    }}
                  />
                  <Box component="span">
                    {typeof option === "object" ? option.name : String(option)}
                  </Box>
                </li>
              );
            }}
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
                color: (theme) => "#090a0cff",
              },
              zIndex: zIndexText,
              position: "relative",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="Търси в сайта..."
                variant="outlined"
                size={isNotSmall ? "medium" : "small"}
                onClick={() => {
                  setZIndexText(1102);
                  setZIndexBackdrop(1101);
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setZIndexText(1000);
                  setZIndexBackdrop(999);
                }}
                onKeyDown={handleKeyDown}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width: { md: 600, sm: 400, xs: 250 },
                  backgroundColor: "white",
                  borderRadius: 6,
                  "& .MuiInputBase-input::placeholder": {
                    color: "#6f767fff",
                    opacity: 1,
                  },
                }}
                inputProps={{
                  ...params.inputProps,
                  maxLength: 100,
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearchClick}
                        aria-label="search"
                      >
                        <SearchIcon
                          sx={{ color: (theme) => theme.palette.primary.main }}
                        />
                      </IconButton>
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
