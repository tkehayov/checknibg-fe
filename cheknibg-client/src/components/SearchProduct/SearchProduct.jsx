import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { ProductApi } from "../../api/product";
import Autocomplete from "@mui/material/Autocomplete";
import {
  API_URLS,
  PAGES_URL,
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

export function SearchProduct({ isBanner }) {
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [isFocused, setIsFocused] = useState(false);
  const [zIndexText, setZIndexText] = useState(isBanner ? 1300 : 1000);
  const [zIndexBackdrop, setZIndexBackdrop] = useState(isBanner ? 1250 : 999);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isBanner) {
      const lower = () => {
        setZIndexText(-1);
        setZIndexBackdrop(-1);
        setIsFocused(false);
      };
      const restore = () => {
        setZIndexText(1000);
        setZIndexBackdrop(999);
      };
      window.addEventListener("bannerSearchFocus", lower);
      window.addEventListener("bannerSearchBlur", restore);
      return () => {
        window.removeEventListener("bannerSearchFocus", lower);
        window.removeEventListener("bannerSearchBlur", restore);
      };
    }
  }, [isBanner]);

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
          zIndex: isBanner ? 1250 : zIndexBackdrop,
          pointerEvents: "none",
          position: "fixed",
        }}
      />
      <Box sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: {
              xl: 600,
              lg: 500,
              md: 400,
              sm: 290,
              xs: isBanner ? 350 : 300,
            },
          }}
        >
          <Autocomplete
            freeSolo
            options={options}
            filterOptions={(options) => options}
            onInputChange={onInputChange}
            getOptionLabel={(option) => {
              if (
                typeof option === "object" &&
                option !== null &&
                option.name
              ) {
                return option.name;
              }
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
                      // mr: 1,
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
                borderColor: isBanner
                  ? "#FFF"
                  : (theme) => theme.palette.primary.main,
                borderRadius: 4,
                borderWidth: 1,
              },
              "& .MuiOutlinedInput-root": {
                paddingTop: { lg: 1, md: 1, sm: 1, xs: 0 },
                paddingBottom: { lg: 1, md: 1, sm: 1, xs: 0 },
              },
              "& .MuiAutocomplete-inputRoot": {
                paddingTop: { lg: 1, md: 1, sm: 1, xs: 0 },
                paddingBottom: { lg: 1, md: 1, sm: 1, xs: 0 },
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) =>
                  theme.palette.primary.main + " !important",
                borderWidth: "3px",
              },
              "& .MuiInputBase-input": {
                color: (theme) => "#090a0cff",
                height: "20px",
              },
              zIndex: zIndexText,
              position: "relative",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder={
                  { isNotSmall }
                    ? "Търси продукт, марка или модел"
                    : "Търси продукт"
                }
                variant="outlined"
                onClick={() => {
                  if (isBanner && !isDesktop) {
                    window.dispatchEvent(new Event("openHeaderSearch"));
                    return;
                  }
                  if (!isBanner) {
                    setZIndexText(1102);
                    setZIndexBackdrop(1101);
                  }
                }}
                onFocus={() => {
                  if (isBanner && !isDesktop) return;
                  setIsFocused(true);
                  if (isBanner)
                    window.dispatchEvent(new Event("bannerSearchFocus"));
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setZIndexText(isBanner ? 1300 : 1000);
                  setZIndexBackdrop(isBanner ? 1250 : 999);
                  if (isBanner)
                    window.dispatchEvent(new Event("bannerSearchBlur"));
                }}
                onKeyDown={handleKeyDown}
                InputLabelProps={{ shrink: true }}
                sx={{
                  width: "100%",
                  backgroundColor: isBanner
                    ? "rgba(36, 178, 204, 0.5)"
                    : "#FFF",
                  borderRadius: 4,
                  "& .MuiInputBase-input::placeholder": {
                    color: isBanner ? "#FFF" : "#6f767fff",
                    opacity: 1,
                  },
                  "& .MuiInputBase-input": {
                    color: isBanner ? "#FFF" : "#6f767fff",

                    fontSize: {
                      xs: "16px",
                      sm: "16px",
                      md: "16px",
                      lg: "16px",
                    },
                  },
                }}
                inputProps={{
                  ...params.inputProps,
                  maxLength: 100,
                  readOnly: isBanner && !isDesktop,
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
                          sx={{
                            color: isBanner
                              ? "#FFF"
                              : (theme) => theme.palette.primary.main,
                            fontSize: "24px",
                          }}
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
