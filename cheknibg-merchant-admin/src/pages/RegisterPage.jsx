import { Button, TextField, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import { AuthApi, setAuthToken } from "../api/auth-api";
import Alert from "@mui/material/Alert";

export function RegisterPage({ changeSidebar }) {
  const [isRegSuccess, setIsRegSuccess] = useState(false);
  const [isRegNotSuccess, setIsRegNotSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    changeSidebar(false);
  }, []);

  const validationSchema = yup.object({
    email: yup.string().email("Невалиден email").required("Невалиден email"),
    url: yup.string().url().required("Невалидeн url"),
    password: yup
      .string()
      .min(
        5,
        "Дължината на паролата трябва да е между 5-10 символа и да съдържа поне 1 специален символ - *@!#%&()^~{}. "
      )
      .max(
        50,
        "Дължината на паролата трябва да е между 5-10 символа и да съдържа поне 1 специален символ - *@!#%&()^~{}."
      )
      .matches(/[*@!#%&()^~{}]+/, "Липсва специален символ.")
      .required("Задължително поле."),
    password2: yup
      .string()
      .required("Паролата не съвпада.")
      .oneOf([yup.ref("password")], "Паролата не съвпада."),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      AuthApi.registerMerchant(values.email, values.password, values.url).then(
        (response) => {
          if ("errors" in response) {
            let errorMessage = "";
            setIsRegNotSuccess(true);
            response.errors.forEach((error) => {
              errorMessage += `${error} \n`;
            });
            setErrorMessage(errorMessage);
            setIsRegSuccess(false);

            return;
          }
          setErrorMessage("");
          setIsRegNotSuccess(false);
          setIsRegSuccess(true);
          setAuthToken(response.token);
        }
      );
    },
  });

  return (
    <Paper
      sx={{
        margin: "auto",
      }}
    >
      <Grid
        container
        direction="row"
        spacing={2}
        xs={4}
        sx={{ margin: "auto" }}
      >
        <Grid item xs={12}>
          <h2>Регистрация на търговец</h2>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                name="email"
                color="secondary"
                type="text"
                variant="filled"
                label="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                FormHelperTextProps={{
                  sx: { fontSize: "14px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                name="password"
                color="secondary"
                type="password"
                variant="filled"
                label="Парола"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                FormHelperTextProps={{
                  sx: { fontSize: "14px" },
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                margin="dense"
                name="password2"
                color="secondary"
                type="password"
                variant="filled"
                label="Повтори парола"
                value={formik.values.password2 || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
                FormHelperTextProps={{
                  sx: { fontSize: "14px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="url"
                margin="dense"
                color="secondary"
                type="text"
                variant="filled"
                label="url"
                value={formik.values.url || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
                FormHelperTextProps={{
                  sx: { fontSize: "14px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                margin="dense"
                disabled={!formik.isValid}
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ marginTop: "5px" }}
              >
                Запази
              </Button>
            </Grid>
          </form>
        </Grid>
        {isRegSuccess && (
          <Grid item xs={12} spacing={4}>
            <Alert variant="outlined" severity="success">
              Регистрацията е направена. Моля, очаквайте емайл след удобрение.
            </Alert>
          </Grid>
        )}

        {isRegNotSuccess && (
          <Grid item xs={12} spacing={4}>
            <Alert variant="outlined" severity="error">
              {errorMessage}
            </Alert>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
