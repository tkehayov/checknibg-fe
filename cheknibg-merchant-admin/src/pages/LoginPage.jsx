import { Button, Grid, TextField, Paper } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import { AuthApi, setAuthToken } from "../api/auth-api";

export function LoginPage({ changeSidebar }) {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    changeSidebar(false);
  }, [changeSidebar]);

  const validationSchema = yup.object({
    email: yup.string().required("Невалиден email"),
    password: yup.string().required("Невалидна парола"),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      AuthApi.loginUser(values.email, values.password).then((response) => {
        if (response.errors) {
          setErrorMessage("Невалиден username/password.");

          return;
        }
        setErrorMessage("");
        setAuthToken(response.access_token);
        changeSidebar(true);
        history("/import");
      });
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
          <h1>Вход за търговци</h1>
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
                label="Потребител"
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
            <Grid item xs={12}>
              <Button
                disabled={!formik.isValid}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Запази
              </Button>
            </Grid>
          </form>
        </Grid>
        {errorMessage && (
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
