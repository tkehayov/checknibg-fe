import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

import { tokens } from "../theme";
import { useEffect, useState } from "react";
import { UserApi } from "../api/user-api";
import { Products } from "../api/products";
import { AnalyzeApi } from "../api/analyze";

export function StatBoxProductsChart({
  isDashboard = true,
  productSearchData,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productData, setProductData] = useState([
    {
      id: "",
      color: tokens("dark").blueAccent[300],
      data: [
        {
          x: "Януари",
          y: 0,
        },
        {
          x: "Февруари",
          y: 0,
        },
        {
          x: "Март",
          y: 0,
        },
        {
          x: "Април",
          y: 0,
        },
        {
          x: "Май",
          y: 0,
        },
        {
          x: "Юни",
          y: 0,
        },
        {
          x: "Юли",
          y: 0,
        },
        {
          x: "Август",
          y: 0,
        },
        {
          x: "Септември",
          y: 0,
        },
        {
          x: "Октомври",
          y: 0,
        },
        {
          x: "Ноември",
          y: 0,
        },
        {
          x: "Декември",
          y: 0,
        },
      ],
    },
  ]);

  const fetchProductMerchantData = async () => {
    let merchantIdResponse = await UserApi.getMerchantId();
    let productIdResponse = await Products.getProductIdByCodeId(
      productSearchData
    );
    if (productIdResponse && merchantIdResponse) {
      fetchYearlyProductStatData(productIdResponse, merchantIdResponse);
    }
  };

  const fetchYearlyProductStatData = async (productId, merchantId) => {
    let productDataResponse = await AnalyzeApi.getProductYearlyCounter(
      productId,
      merchantId
    );

    if (productDataResponse) {
      let currentData = [
        {
          id: productSearchData,
          color: tokens("dark").blueAccent[300],
          data: [
            {
              x: "Януари",
              y: productDataResponse[1],
            },
            {
              x: "Февруари",
              y: productDataResponse[2],
            },
            {
              x: "Март",
              y: productDataResponse[3],
            },
            {
              x: "Април",
              y: productDataResponse[4],
            },
            {
              x: "Май",
              y: productDataResponse[5],
            },
            {
              x: "Юни",
              y: productDataResponse[6],
            },
            {
              x: "Юли",
              y: productDataResponse[7],
            },
            {
              x: "Август",
              y: productDataResponse[8],
            },
            {
              x: "Септември",
              y: productDataResponse[9],
            },
            {
              x: "Октомври",
              y: productDataResponse[10],
            },
            {
              x: "Ноември",
              y: productDataResponse[11],
            },
            {
              x: "Декември",
              y: productDataResponse[12],
            },
          ],
        },
      ];

      setProductData(currentData);
    }
  };

  useEffect(() => {
    if (productSearchData) {
      fetchProductMerchantData();
    }
  }, [productSearchData]);

  return (
    <ResponsiveLine
      data={productData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Месец", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Кликове", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
