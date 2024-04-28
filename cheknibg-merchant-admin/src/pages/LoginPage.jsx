import { Box, useTheme, Button, TextField } from "@mui/material";

import { tokens } from "../theme";

import { useEffect } from "react";

import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { Box,  } from "@mui/material";
import { useFormik } from "formik";

import { AuthApi, setAuthToken } from "../api/auth-api";

export function LoginPage({ changeSidebar }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    changeSidebar(false);
  }, []);

  const validationSchema = yup.object({
    username: yup.string().required("Невалиден username"),
    password: yup.string().required("Невалидна парола"),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
      AuthApi.loginUser(values.username, values.password).then((response) => {
        setAuthToken(response.token);
      });
    },
  });

  return (
    <Box m="20px">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="username"
          color="secondary"
          type="text"
          variant="filled"
          label="Потребител"
          value={formik.values.username || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          name="password"
          color="secondary"
          type="password"
          variant="filled"
          label="Парола"
          value={formik.values.password || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          disabled={!formik.isValid}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Запази
        </Button>
      </form>
    </Box>
  );
}
