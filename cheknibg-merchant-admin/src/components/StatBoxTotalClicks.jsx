import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { AnalyzeApi } from "../api/analyze";
import { UserApi } from "../api/user-api";

export function StatBoxTotalClicks({ subtitle, icon }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentMonth = new Date().getMonth();
  const [monthNumber, setMonthNumber] = useState(currentMonth);
  const [merchantId, setMerchantId] = useState("");
  const [title, setTitle] = useState(0);

  const monthNames = [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ];

  async function getMonthlyTotalProducts() {
    const data = await AnalyzeApi.getMonthlyTotalProducts(
      merchantId,
      monthNumber + 1
    );
    if (data) {
      setTitle(data.total);
    }
  }

  useEffect(() => {
    const fetchMerchantId = async () => {
      const merchantIdResponse = await UserApi.getMerchantId();
      if (merchantIdResponse && merchantIdResponse.data !== "") {
        setMerchantId(merchantIdResponse);
      }
    };

    fetchMerchantId();
    if (merchantId) {
      getMonthlyTotalProducts();
    }
  }, [merchantId]);

  useEffect(() => {
    if (merchantId) {
      getMonthlyTotalProducts();
    }
  }, [monthNumber]);

  const handleChange = (event) => {
    setMonthNumber(parseInt(event.target.value));
  };
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="5px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" sx={{ color: colors.greenAccent[600] }}>
          <Box display="flex" justifyContent="space-between">
            <FormControl variant="standard">
              <Select value={monthNumber} onChange={handleChange}>
                <MenuItem value={currentMonth - 2}>
                  {monthNames[currentMonth - 2]}
                </MenuItem>
                <MenuItem value={currentMonth - 1}>
                  {monthNames[currentMonth - 1]}
                </MenuItem>
                <MenuItem value={currentMonth}>
                  {monthNames[currentMonth]}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
