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
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { AuthApi, setAuthToken } from "../api/auth-api";
import { ReactComponent as Logo } from "../assets/CHEKNI-LOGO.svg";
import { BRAND } from "../theme";

const TEAL = BRAND.teal;
const NAVY_DARK = BRAND.navyDark;
const NAVY_MID = BRAND.navyMid;

const validationSchema = yup.object({
  email: yup.string().email("Невалиден email").required("Невалиден email"),
  url: yup.string().url("Невалиден URL").required("Невалиден URL"),
  password: yup
    .string()
    .min(5, "Минимум 5 символа, поне 1 специален - *@!#%&()^~{}")
    .max(50, "Максимум 50 символа")
    .matches(/[*@!#%&()^~{}]+/, "Липсва специален символ.")
    .required("Задължително поле."),
  password2: yup
    .string()
    .required("Паролата не съвпада.")
    .oneOf([yup.ref("password")], "Паролата не съвпада."),
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

export function RegisterPage({ changeSidebar }) {
  const [isRegSuccess, setIsRegSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    changeSidebar(false);
  }, [changeSidebar]);

  const formik = useFormik({
    initialValues: { email: "", password: "", password2: "", url: "" },
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      AuthApi.registerMerchant(values.email, values.password, values.url).then(
        (response) => {
          if ("errors" in response) {
            let msg = "";
            response.errors.forEach((e) => (msg += `${e} \n`));
            setErrorMessage(msg);
            setIsRegSuccess(false);
            return;
          }
          setErrorMessage("");
          setIsRegSuccess(true);
          setAuthToken(response.token);
        }
      );
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
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)", fontSize: "16px" },
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
        py: 4,
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
          maxWidth: 420,
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
          Регистрация
        </Typography>

        <form onSubmit={formik.handleSubmit}>
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

          <TextField
            fullWidth
            name="url"
            type="text"
            label="URL на магазина"
            variant="outlined"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

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

          <TextField
            fullWidth
            name="password2"
            type="password"
            label="Повтори парола"
            variant="outlined"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
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
            <Alert severity="error" sx={{ mb: 2, whiteSpace: "pre-line" }}>
              {errorMessage}
            </Alert>
          )}

          {isRegSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Регистрацията е направена. Моля, очаквайте имейл след одобрение.
            </Alert>
          )}

          <Button
            fullWidth
            disabled={!formik.isValid || isRegSuccess}
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
            РЕГИСТРИРАЙ СЕ
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2.5, color: "rgba(255,255,255,0.55)" }}
        >
          Вече имате акаунт?{" "}
          <Typography
            component="a"
            href="/login"
            variant="body2"
            sx={{
              color: TEAL,
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Влезте тук
          </Typography>
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.45)", mt: 3, zIndex: 1 }}
      >
        Chekni.bg — Портал за търговци
      </Typography>
    </Box>
  );
}
