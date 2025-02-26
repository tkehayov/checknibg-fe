import { Box, useTheme } from "@mui/material";
import { HeaderContent } from "../components/HeaderContent";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import { useEffect } from "react";
import { MerchantProductApi } from "../api/merchants-products";

export function ProductPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageState, setPageState] = useState({
    isLoading: false,
    content: [],
    totalPages: 0,
    page: 1,
    pageSize: 10,
  });

  const columns = [
    { field: "id", headerName: "Id" },
    { field: "codeId", headerName: "CODE ID" },
    {
      field: "name",
      headerName: "Продукт",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Цена",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "url",
      headerName: "Линк",
      flex: 1,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          window.open(currentRow.url, "_blank");
        };

        return (
          <Button
            size="small"
            color="secondary"
            variant="contained"
            component={Link}
            startIcon={<OpenInNewIcon />}
            onClick={onClick}
          >
            Преглед
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const response = await MerchantProductApi.getProducts(
        pageState.page,
        pageState.pageSize
      );

      let data = mapData(response);
      setPageState((old) => ({
        ...old,
        isLoading: false,
        content: data.content,
        totalPages: data.totalPages,
      }));
    };

    fetchData();
  }, [pageState.page, pageState.pageSize]);

  function mapData(data) {
    let productContent = [];
    data.content.forEach((content) => {
      productContent.push({
        id: content.id,
        codeId: content.productDetails.codeId,
        name: content.productDetails.name,
        url: content.url,
        price: content.price,
      });
    });

    return {
      content: productContent,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
    };
  }

  return (
    <Box m="20px">
      <HeaderContent title="Продукти" subtitle="Преглед на продуктите" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          autoHeight
          rows={pageState.content}
          rowCount={pageState.pageSize * pageState.totalPages}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 20, 50, 100]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns}
        />
      </Box>
    </Box>
  );
}
