import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  Box,
  IconButton,
  Slide,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { ProductApi } from "../../api/product";
import {
  API_URLS,
  PAGES_URL,
  PRODUCTS_IMAGES_URL_THUMBNAILS,
} from "../../config";

const SlideDown = React.forwardRef(function SlideDown(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setSearchTerm("");
      setResults([]);
    }
  }, [open]);

  function handleInputChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(timer);

    if (value.trim().length > 2) {
      const id = setTimeout(async () => {
        const cleaned = value.trim().replace(/[^\w\s]/gi, "");
        const data = await ProductApi.searchProduct(cleaned);
        setResults(data || []);
      }, 400);
      setTimer(id);
    } else {
      setResults([]);
    }
  }

  function handleClear() {
    setSearchTerm("");
    setResults([]);
    inputRef.current?.focus();
  }

  function handleSearch() {
    if (searchTerm.trim().length > 2) {
      navigate(PAGES_URL.searchResultPage + `/${searchTerm.trim()}`);
      onClose();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  function handleProductClick(product) {
    navigate(PAGES_URL.product + `/${product.id}`);
    onClose();
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={SlideDown}
      sx={{ zIndex: 1400 }}
    >
      {/* ── Search bar row ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 1,
          gap: 0.5,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <IconButton onClick={onClose} aria-label="close search">
          <ArrowBackIcon sx={{ color: "text.primary", fontSize: 28 }} />
        </IconButton>

        <TextField
          inputRef={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          fullWidth
          placeholder="Търси продукт, марка или модел"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              fontSize: "1.1rem",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchTerm && (
                  <IconButton onClick={handleClear} edge="end">
                    <CloseIcon sx={{ color: "text.primary", fontSize: 28 }} />
                  </IconButton>
                )}
                <IconButton onClick={handleSearch} edge="end">
                  <ArrowCircleRightOutlinedIcon
                    sx={{ color: "text.primary", fontSize: 28 }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* ── Results list ── */}
      <List disablePadding sx={{ overflowY: "auto", flex: 1 }}>
        {results.map((product, index) => (
          <React.Fragment key={product.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleProductClick(product)}
                sx={{ py: 1.5, "&:hover": { bgcolor: "#f5f5f5" } }}
              >
                <ListItemIcon sx={{ minWidth: 52 }}>
                  <Box
                    component="img"
                    src={
                      API_URLS.products +
                      PRODUCTS_IMAGES_URL_THUMBNAILS +
                      "/" +
                      product.images?.[0]?.filename
                    }
                    alt={product.name}
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                      borderRadius: 1,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={product.name}
                  primaryTypographyProps={{ fontSize: "0.95rem" }}
                />
              </ListItemButton>
            </ListItem>
            {index < results.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Dialog>
  );
}
