import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Контакти | Chekni.bg</title>
        <meta
          name="description"
          content="Свържете се с екипа на Chekni.bg — намерете ни по имейл или на адрес."
        />
      </Helmet>

      <Header selectedCategory={() => {}} hideSearch />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Контакти
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Info notice */}
        <Box
          sx={{
            bgcolor: "#f0f9fb",
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            p: 3,
            mb: 5,
          }}
        >
          <Typography variant="h6" sx={{ lineHeight: 1.8, color: "text.primary", fontWeight: 400 }}>
            Уважаеми клиенти, платформи като chekni.bg функционират като
            търсачки и агрегатори на оферти и не обработват директно поръчки или
            доставки. При въпроси относно закупени продукти, моля, обръщайте се
            директно към търговеца. Връзка с него можете да осъществите чрез
            бутона „Към магазина", разположен вдясно от цената на съответния
            артикул.
          </Typography>
        </Box>

        {/* Contact details */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <LocationOnOutlinedIcon
                sx={{ color: "primary.main", mt: 0.5, fontSize: 32 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Адрес
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  бул. Витоша 1<br />
                  1000 София, България
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <LocalPhoneOutlinedIcon
                sx={{ color: "primary.main", mt: 0.5, fontSize: 32 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Телефон
                </Typography>
                <Typography
                  component="a"
                  href="tel:+359898684599"
                  variant="body1"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  +359 898 684 599
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <EmailOutlinedIcon
                sx={{ color: "primary.main", mt: 0.5, fontSize: 32 }}
              />
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Имейл
                </Typography>
                <Typography
                  component="a"
                  href="mailto:info@chekni.bg"
                  variant="body1"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  info@chekni.bg
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default ContactPage;
