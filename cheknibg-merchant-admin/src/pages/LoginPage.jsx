import {
  Alert,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { AuthApi, setAuthToken } from "../api/auth-api";
import { ReactComponent as Logo } from "../assets/CHEKNI-LOGO.svg";
import { BRAND } from "../theme";

const TEAL = BRAND.teal;
const NAVY_DARK = BRAND.navyDark;
const NAVY_MID = BRAND.navyMid;

const validationSchema = yup.object({
  email: yup.string().required("Невалиден email"),
  password: yup.string().required("Невалидна парола"),
});

function Bubble({ size, top, left, opacity = 0.15 }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${TEAL} 0%, transparent 70%)`,
        top,
        left,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}

export function LoginPage({ changeSidebar }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    changeSidebar(false);
  }, [changeSidebar]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
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
        navigate("/import");
      });
    },
  });

  const inputSx = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      color: "#fff",
      fontSize: "16px",
      "& fieldset": { borderColor: "rgba(255,255,255,0.25)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
      "&.Mui-focused fieldset": { borderColor: TEAL },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.6)",
      fontSize: "16px",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: TEAL },
    "& .MuiInputAdornment-root svg": { color: "rgba(255,255,255,0.5)" },
    "& .MuiFormHelperText-root": { color: "#f44336" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY_MID} 60%, #162030 100%)`,
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Decorative bubbles */}
      <Bubble size={500} top="-150px" left="-150px" opacity={0.12} />
      <Bubble size={350} top="60%" left="70%" opacity={0.1} />
      <Bubble size={200} top="10%" left="75%" opacity={0.15} />

      {/* Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backdropFilter: "blur(16px)",
          bgcolor: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Logo style={{ width: 140, height: "auto" }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          fontWeight={700}
          align="center"
          sx={{ color: "#fff", mb: 3 }}
        >
          Вход
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <TextField
            fullWidth
            name="email"
            type="text"
            label="Имейл"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Парола"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {/* Submit */}
          <Button
            fullWidth
            disabled={!formik.isValid}
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              py: 0.8,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: 1,
              bgcolor: TEAL,
              "&:hover": { bgcolor: "#1d9ab0" },
              "&.Mui-disabled": {
                bgcolor: "rgba(36,178,204,0.3)",
                color: "rgba(255,255,255,0.4)",
              },
            }}
          >
            ВХОД
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2.5, color: "rgba(255,255,255,0.55)" }}
        >
          Нямате регистрация?{" "}
          <Typography
            component="a"
            href="/register"
            variant="body2"
            sx={{
              color: TEAL,
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Регистрирай се
          </Typography>
        </Typography>
      </Box>

      {/* Footer note */}
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.45)", mt: 3, zIndex: 1 }}
      >
        Chekni.bg — Портал за търговци
      </Typography>
    </Box>
  );
}
