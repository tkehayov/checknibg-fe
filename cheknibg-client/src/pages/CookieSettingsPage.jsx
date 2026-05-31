import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

const STORAGE_KEY = "chekni_cookie_prefs";

function loadPrefs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { analytics: false, marketing: false };
}

function savePrefs(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function CookieCard({ title, description, control, highlight }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: highlight ? "primary.main" : "#e0e0e0",
        borderRadius: 2,
        p: 3,
        bgcolor: highlight ? "#f0f9fb" : "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ flexShrink: 0, pt: 0.5 }}>{control}</Box>
      </Box>
    </Box>
  );
}

export function CookieSettingsPage() {
  const [prefs, setPrefs] = useState(loadPrefs);
  const [saved, setSaved] = useState(false);

  function handleToggle(key) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  }

  function handleSave() {
    savePrefs(prefs);
    setSaved(true);
  }

  function handleAcceptAll() {
    const all = { analytics: true, marketing: true };
    setPrefs(all);
    savePrefs(all);
    setSaved(true);
  }

  function handleRejectAll() {
    const none = { analytics: false, marketing: false };
    setPrefs(none);
    savePrefs(none);
    setSaved(true);
  }

  return (
    <>
      <Helmet>
        <title>Настройки за бисквитки | Chekni.bg</title>
        <meta
          name="description"
          content="Управлявайте предпочитанията си за бисквитки на Chekni.bg — изберете кои категории да бъдат активни."
        />
      </Helmet>

      <Header selectedCategory={() => {}} hideSearch />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Настройки за бисквитки
        </Typography>

        <Typography variant="h6" fontWeight={400} color="text.secondary" sx={{ mb: 1 }}>
          Управлявайте предпочитанията си по отношение на „бисквитките"
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" fontWeight={400} sx={{ lineHeight: 1.8, mb: 4 }}>
          Когато посещавате Chekni.bg, ние използваме „бисквитки", за да
          осигурим правилното функциониране на платформата и да подобрим
          потребителското Ви изживяване. По-долу можете да изберете кои
          категории „бисквитки" да бъдат активни.
        </Typography>

        <Stack spacing={2} sx={{ mb: 5 }}>
          {/* Necessary — always on */}
          <CookieCard
            highlight
            title="Необходими бисквитки"
            description={'Тези „бисквитки“ са задължителни за правилното функциониране на сайта — съхраняват Вашите настройки за поверителност и поддържат сигурността на сесията. Не могат да бъдат изключени.'}
            control={
              <FormControlLabel
                control={<Switch checked disabled color="primary" />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    Винаги активни
                  </Typography>
                }
                labelPlacement="bottom"
                sx={{ m: 0, alignItems: "center" }}
              />
            }
          />

          {/* Analytics */}
          <CookieCard
            title="Аналитични бисквитки"
            description="Помагат ни да разберем как потребителите взаимодействат с платформата (кои категории са най-популярни, колко време се прекарва на сайта). Информацията е анонимизирана и се използва само за подобряване на интерфейса."
            control={
              <FormControlLabel
                control={
                  <Switch
                    checked={prefs.analytics}
                    onChange={() => handleToggle("analytics")}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    {prefs.analytics ? "Активни" : "Неактивни"}
                  </Typography>
                }
                labelPlacement="bottom"
                sx={{ m: 0, alignItems: "center" }}
              />
            }
          />

          {/* Marketing */}
          <CookieCard
            title="Маркетингови и реферални бисквитки"
            description='Регистрират пренасочванията към партньорски онлайн магазини при натискане на „Към магазина". Използват се и за показване на по-релевантни реклами спрямо Вашите интереси.'
            control={
              <FormControlLabel
                control={
                  <Switch
                    checked={prefs.marketing}
                    onChange={() => handleToggle("marketing")}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    {prefs.marketing ? "Активни" : "Неактивни"}
                  </Typography>
                }
                labelPlacement="bottom"
                sx={{ m: 0, alignItems: "center" }}
              />
            }
          />
        </Stack>

        {/* Action buttons */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
          >
            Запази настройките
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleAcceptAll}
            sx={{ borderColor: "primary.main", color: "primary.main" }}
          >
            Приеми всички
          </Button>
          <Button
            variant="text"
            size="large"
            onClick={handleRejectAll}
            sx={{ color: "text.secondary" }}
          >
            Откажи всички
          </Button>
        </Stack>

        {/* Save confirmation */}
        {saved && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 3,
              color: "primary.main",
            }}
          >
            <CheckCircleOutlineIcon />
            <Typography variant="body1" fontWeight={500}>
              Настройките са запазени успешно.
            </Typography>
          </Box>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default CookieSettingsPage;
