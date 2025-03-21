import {
  Box,
  useTheme,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { HeaderContent } from "../components/HeaderContent";
import { tokens } from "../theme";
import { StatBoxTotalClicks } from "../components/StatBoxTotalClicks";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { StatBoxProductsChart } from "../components/StatBoxProductsChart";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export function HomePage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productSearch, setProductSearch] = useState("");
  const [productSearchData, setProductSearchData] = useState("");

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HeaderContent title="Начало" subtitle="Начало" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxTotalClicks
            subtitle="Брой кликове"
            icon={
              <AdsClickIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box></Box>
        <Box></Box>
      </Box>
      {/* ROW 2 */}
      <Box
        gridColumn="span 8"
        gridRow="span 1"
        backgroundColor={colors.primary[400]}
        pt="20px"
        mt="20px"
      >
        <Box
          gridColumn="span 1"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box mt="25px" p="0 30px" display="flex" alignItems="left">
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Брой кликове за продукт
              </Typography>
            </Box>
          </Box>
          <Box backgroundColor={colors.primary[400]} p="0 30px" display="flex">
            <TextField
              variant="standard"
              placeholder="Search"
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <IconButton
              onClick={(e) => setProductSearchData(productSearch)}
              type="button"
              sx={{ p: 1 }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <StatBoxProductsChart
              productSearchData={productSearchData}
              isDashboard={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
