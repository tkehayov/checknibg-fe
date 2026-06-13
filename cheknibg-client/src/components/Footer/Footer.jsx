import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { MERCHANT_PORTAL_URL } from "../../config";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const footerStyle = {
  mt: 3,
  backgroundColor: (theme) => theme.palette.background.default,
};

const sections = [
  {
    title: "Категории:",
    links: [
      { name: "Лаптопи", url: "/category/laptops" },
      { name: "Компютри", url: "/category/computers" },
      { name: "Таблети", url: "/category/tablets" },
      { name: "Смартфони", url: "/category/smartphones" },
      { name: "Часовници", url: "/category/watches" },
      { name: "Аудио", url: "/category/audio" },
      { name: "Монитори", url: "/category/monitors" },
      { name: "Телевизори", url: "/category/tvs" },
      { name: "Периферия", url: "/category/peripherals" },
      { name: "Компоненти", url: "/category/components" },
      { name: "Аксесоари", url: "/category/accessories" },
    ],
  },
];

const socialLinks = [
  {
    icon: <FacebookIcon />,
    url: "https://www.facebook.com/chekni.bg",
    label: "Facebook",
  },
  {
    icon: <InstagramIcon />,
    url: "https://www.instagram.com/chekni.bg",
    label: "Instagram",
  },
];

export function Footer() {
  return (
    // <Box component="footer" sx={footerStyle}>
    <Box sx={footerStyle}>
      <Grid container justifyContent="center">
        {/* Main Link Columns */}
        <Grid item lg={3} xs={4} sm={4} md={3} key="търговци">
          <Typography variant="h5" gutterBottom>
            За търговци
          </Typography>

          <Link
            href={MERCHANT_PORTAL_URL}
            key="Портал"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            Портал
          </Link>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Социални мрежи
          </Typography>
          <Box>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                aria-label={social.label}
                color="inherit"
                href={social.url}
                target="_blank"
                sx={{ mr: 1 }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Grid>
        <Grid item lg={3} xs={4} sm={4} md={3} key="нас">
          <Typography variant="h5" gutterBottom>
            За нас
          </Typography>

          <Link
            href="/about"
            key="Портал"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            За chekni.bg
          </Link>
          <Link
            href="/contact"
            key="Контакти"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            Контакти
          </Link>
          <Link
            href="/terms"
            key="Условия"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            Общи условия
          </Link>
          <Link
            href="/privacy"
            key="Поверителност"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            Политика за поверителност
          </Link>
          <Link
            href="/cookies-policy"
            key="бисквитки политика"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            Политика за бисквитки
          </Link>
          <Link
            href="/cookies-settings"
            key="бисквитки настройки"
            sx={{ display: "block" }}
            variant="subtitle1"
            underline="hover"
          >
            Настойка за бисквитки
          </Link>
        </Grid>
        {/* Social Links Column */}
        <Grid item lg={2} xs={4} sm={4} md={2}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Категории
          </Typography>
          {sections.map((section) =>
            section.links.map((link) => (
              <Link
                href={link.url}
                key={link.name}
                sx={{ display: "block" }}
                variant="subtitle1"
                underline="hover"
              >
                {link.name}
              </Link>
            )),
          )}
        </Grid>
      </Grid>

      {/* --- Separator and Copyright --- */}
      <Box mt={5}>
        <Typography variant="body2" color="text.secondary" align="center">
          2026 &copy; cheknibg Всички права запазени.
        </Typography>
      </Box>
    </Box>
  );
}
export default Footer;
