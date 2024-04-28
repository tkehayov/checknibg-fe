import { Box, useTheme, Button, TextField } from "@mui/material";

import { tokens } from "../theme";

import { useEffect } from "react";

import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { Box,  } from "@mui/material";
import { useFormik } from "formik";
import { AuthApi, setAuthToken } from "../api/auth-api";
export function RegisterPage({ changeSidebar }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    changeSidebar(false);
  }, []);

  const validationSchema = yup.object({
    firstName: yup.string().required("Невалиден firstName"),
    lastName: yup.string().required("Невалидна lastName"),
    username: yup.string().required("Невалидна lastName"),
    password: yup.string().required("Невалидна парола"),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
      AuthApi.registerUser(
        values.firstName,
        values.lastName,
        values.username,
        values.password
      ).then((response) => {
        setAuthToken(response.token);
      });
    },
  });

  return (
    <Box m="20px">
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="firstName"
          color="secondary"
          type="text"
          variant="filled"
          label="Име"
          value={formik.values.firstName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          name="lastName"
          color="secondary"
          type="text"
          variant="filled"
          label="Фамилия"
          value={formik.values.lastName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          name="username"
          color="secondary"
          type="text"
          variant="filled"
          label="username"
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
