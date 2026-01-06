import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";

export function PriceFilterSlider({
  productFilterPrice,
  setSelectedProductFilterPrice,
}) {
  const [stepSize, setStepSize] = useState(10);

  const [priceValue, setPriceValue] = useState([]);

  const handleChangeValue = (event, newValue, activeThumb) => {
    setPriceValue(newValue);
    productFilterPrice = newValue;
  };
  const handleReleaseValue = (event, newValue, activeThumb) => {
    setSelectedProductFilterPrice({
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };
  function valuetext(value) {
    return `${value}°C`;
  }

  useEffect(() => {
    if (productFilterPrice.minPrice || productFilterPrice.maxPrice) {
      setStepSize(
        parseInt(
          (productFilterPrice.maxPrice - productFilterPrice.minPrice) / 10
        )
      );
      setPriceValue([productFilterPrice.minPrice, productFilterPrice.maxPrice]);
    } else {
      setPriceValue([0, 0]);
    }
  }, [productFilterPrice]);

  return (
    <Box>
      Цена
      <Slider
        step={stepSize}
        getAriaLabel={() => "Minimum distance"}
        value={priceValue}
        onChange={handleChangeValue}
        onChangeCommitted={handleReleaseValue}
        getAriaValueText={valuetext}
        marks
        valueLabelDisplay="off"
        disableSwap
        min={productFilterPrice.minPrice}
        max={productFilterPrice.maxPrice}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>{priceValue[0]}€</Typography>
        <Typography>{priceValue[1]}€</Typography>
      </Box>
    </Box>
  );
}
