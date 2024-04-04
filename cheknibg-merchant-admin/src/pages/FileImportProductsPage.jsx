import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { HeaderContent } from "../components/HeaderContent";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { tokens } from "../theme";
import { ProductImportApi } from "../api/products-import";
import { SnackBar } from "../components/SnackBar";
import { ImportProductResultsList } from "../components/ImportProductResultsList";
import { HttpStatusCode } from "axios";
import { MerchantSettingsApi } from "../api/merchant-settings";
import Alert from "@mui/material/Alert";

export function FileImportProductsPage({ open }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isFileImport, setIsFileImport] = useState(false);

  const [snackBar, setSnackBar] = useState({
    severity: "success",
    message: "",
  });
  const [productsResult, setProductsResult] = useState();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  async function upload() {
    const formData = new FormData();

    const file = acceptedFiles[0];
    formData.append("file", file);
    await ProductImportApi.importProducts(formData)
      .then((response) => {
        setProductsResult(response);
        setOpenSnackBar(true);
        const snack = {
          severity: "success",
          message: "Успешно импортване на продукти",
        };
        setSnackBar(snack);
        return <></>;
      })
      .catch((err) => {
        if (HttpStatusCode.UnprocessableEntity === err.response.status) {
          setOpenSnackBar(true);
          setProductsResult();
          const snack = {
            severity: "error",
            message: "Невалиден файл фопрмат",
          };
          setSnackBar(snack);
        }
      });
  }

  async function getMerchantUrlImportSettings() {
    // TODO replace with real userId
    const userId = 2;

    const urlConfigResponse =
      await MerchantSettingsApi.getMerchantUrlImportSettings(userId);
    if (urlConfigResponse.url) {
      setIsFileImport(false);
      return;
    }
    setIsFileImport(true);
  }

  useEffect(() => {
    getMerchantUrlImportSettings();
  }, []);

  return (
    <>
      <Box m="20px">
        <HeaderContent title="Импорт на продукти" subtitle="" />
        {isFileImport ? (
          <Paper sx={{ padding: 1 }}>
            <Card
              variant="outlined"
              sx={{
                maxWidth: 500,
                margin: "auto",
                height: 150,
                border: `1px solid ${colors.greenAccent[300]}`,
              }}
              {...getRootProps({ className: "dropzone" })}
            >
              <CardContent>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <input className="input-zone" {...getInputProps()} />

                  {isDragActive ? (
                    <p className="dropzone-content">
                      Release to drop the files here
                    </p>
                  ) : (
                    <Typography sx={{ margin: "auto" }}>
                      <UploadFileIcon
                        sx={{
                          fontSize: 50,
                          marginLeft: "auto",
                          color: `${colors.greenAccent[600]}`,
                        }}
                      />
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    color="secondary"
                    onClick={open}
                    variant="outlined"
                    sx={{
                      margin: "auto",
                      color: `${colors.greenAccent[600]}`,
                    }}
                  >
                    Click to select files
                  </Button>
                </Grid>
                <Typography>{files}</Typography>
              </CardContent>
            </Card>

            <Box
              sx={{
                margin: "auto",
                marginTop: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={upload}
                disabled={files.length == 0}
              >
                Запази
              </Button>
            </Box>
            {productsResult && (
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <ImportProductResultsList
                    name={"Нови продукти"}
                    color={colors.greenAccent[500]}
                    products={productsResult.modified}
                    tooltip={
                      "Нови продукти или продукти с променени стойности, които са добавени във вашия профил."
                    }
                  />
                </Grid>
                <Grid item>
                  <ImportProductResultsList
                    name={"Непроменени продукти"}
                    color={colors.blueAccent[500]}
                    products={productsResult.unchanged}
                    tooltip={"Продукти с непроменени стойности."}
                  />
                </Grid>
                <Grid item>
                  <ImportProductResultsList
                    name={"Липсващи продукти"}
                    color={colors.redAccent[500]}
                    products={productsResult.notExists}
                    tooltip={
                      "Липсващи продукти в системата. Тези продукти ще бъдат разгледани и добавени ръчно от нас."
                    }
                  />
                </Grid>
              </Grid>
            )}
          </Paper>
        ) : (
          <Paper sx={{ padding: 1 }}>
            <Alert variant="outlined" severity="warning">
              <strong>File Import</strong> е деактивиран. За да активирате file
              import, моля изберете от{" "}
              <strong>Настройки -&gt; File Import</strong>.
            </Alert>
          </Paper>
        )}
      </Box>
      <SnackBar
        open={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        message={snackBar.message}
        severity={snackBar.severity}
      />
    </>
  );
}
