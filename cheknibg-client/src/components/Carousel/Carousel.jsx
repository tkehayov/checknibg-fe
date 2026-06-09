import { useRef, useState, useEffect } from "react";
import { Button, Box, IconButton, styled, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { ChekniIcon } from "../ChekniIcon/ChekniIcon";
import { ProductApi } from "../../api/product";
import { API_URLS, PAGES_URL, PRODUCTS_IMAGES_URL } from "../../config";

const CARD_WIDTH = 240;
const CARD_HEIGHT = 310;
const GAP = 8;

const VisuallyHiddenSpan = styled("span")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  top: 20,
  width: 1,
  whiteSpace: "nowrap",
});

export function CarouselAd({ ids }) {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductApi.fetchProducts(ids.join(","))
      .then(setProducts)
      .catch(() => {});
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir * (CARD_WIDTH + GAP) * 4,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => scroll(-1)}
        sx={{
          display: { xs: "none", md: "inline-flex" },
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          px: { xs: 0, md: "48px" },
          py: 1,
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              flexShrink: 0,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: 1,
              overflow: "hidden",
              boxShadow: "none",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={
                API_URLS.products +
                PRODUCTS_IMAGES_URL +
                "/" +
                product.image.filename
              }
              alt={product.name}
              style={{ width: "100%", height: 140, objectFit: "cover" }}
            />
            <Box
              sx={{
                px: 1,
                pt: 1,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body3">{product.name}</Typography>
              <Typography variant="body4" sx={{ marginTop: "auto" }}>
                <p style={{ margin: 0 }}>
                  <strong>Цена от: {product.minPrice}&#8364;</strong>
                </p>
              </Typography>
            </Box>
            <Box sx={{ px: 1, pt: 1 }}>
              <Button
                fullWidth
                component={Link}
                to={PAGES_URL.product + `/${product.id}`}
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: 6,
                  boxShadow: "none",
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: (theme) => theme.palette.primary.main,
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                    boxShadow: "none",
                  },
                }}
              >
                <ChekniIcon />
                <VisuallyHiddenSpan>Сравни цените</VisuallyHiddenSpan>
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll(1)}
        sx={{
          display: { xs: "none", md: "inline-flex" },
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
export default CarouselAd;
