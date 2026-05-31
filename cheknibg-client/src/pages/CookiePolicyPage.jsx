import { Box, Container, Divider, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

function SectionTitle({ children }) {
  return (
    <Typography variant="h5" fontWeight={700} sx={{ mt: 5, mb: 1.5 }}>
      {children}
    </Typography>
  );
}

function SubSectionTitle({ children }) {
  return (
    <Typography variant="h6" fontWeight={700} sx={{ mt: 3, mb: 1 }}>
      {children}
    </Typography>
  );
}

function BodyText({ children, sx }) {
  return (
    <Typography
      variant="h6"
      fontWeight={400}
      sx={{ lineHeight: 1.8, mb: 1.5, ...sx }}
    >
      {children}
    </Typography>
  );
}

function BulletText({ title, children }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
      <Typography
        variant="h6"
        fontWeight={400}
        sx={{ color: "primary.main", flexShrink: 0 }}
      >
        •
      </Typography>
      <Typography variant="h6" fontWeight={400} sx={{ lineHeight: 1.8 }}>
        {title && <strong>{title} </strong>}
        {children}
      </Typography>
    </Box>
  );
}

function InfoBox({ children }) {
  return (
    <Box
      sx={{
        bgcolor: "#f0f9fb",
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: 2,
        p: 2.5,
        mb: 2,
      }}
    >
      <BodyText sx={{ mb: 0 }}>{children}</BodyText>
    </Box>
  );
}

export function CookiePolicyPage() {
  return (
    <>
      <Helmet>
        <title>Политика за бисквитки | Chekni.bg</title>
        <meta
          name="description"
          content="Политика за използване на бисквитки (Cookie Policy) на Chekni.bg — какви бисквитки използваме, защо и как да ги управлявате."
        />
      </Helmet>

      <Header selectedCategory={() => {}} hideSearch />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Политика за използване на „Бисквитки" (Cookie Policy)
        </Typography>

        <Typography
          variant="h6"
          fontWeight={400}
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          Последна актуализация: Май 2026 г.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <BodyText>
          Добре дошли в Chekni.bg. За да осигурим правилното функциониране на
          нашата платформа за сравнение на цени и да Ви предоставим
          най-удобното потребителско изживяване, ние използваме т.нар.
          „бисквитки" (cookies).
        </BodyText>
        <BodyText>
          Настоящата политика Ви информира какви „бисквитки" използваме, с
          каква цел и как можете да ги управлявате.
        </BodyText>

        {/* 1 */}
        <SectionTitle>1. Какво представляват „бисквитките"?</SectionTitle>
        <BodyText>
          „Бисквитките" са малки текстови файлове, които се записват на Вашия
          компютър, мобилно устройство или таблет, когато посещавате даден
          уебсайт. Те позволяват на сайта да разпознава Вашето устройство и да
          запаметява определена информация за Вашите предпочитания или минали
          действия (например език, размер на шрифта, история на търсенията).
        </BodyText>

        {/* 2 */}
        <SectionTitle>
          2. Какви видове „бисквитки" използваме и защо?
        </SectionTitle>
        <BodyText>
          Тъй като Chekni.bg е платформа за агрегиране на оферти, ние
          използваме ограничена група от „бисквитки", разделени в следните
          категории:
        </BodyText>

        <SubSectionTitle>
          А. Строго необходими (системни) бисквитки
        </SubSectionTitle>
        <BodyText>
          Тези „бисквитки" са абсолютно задължителни за правилната и сигурна
          работа на сайта. Без тях платформата не може да функционира нормално
          (например те запомнят Вашите настройки за поверителност или поддържат
          сигурността на сесията).
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Правно основание:">Легитимен интерес.</BulletText>
          <BulletText title="Съгласие:">
            Тези бисквитки не могат да бъдат изключени чрез нашия банер.
          </BulletText>
        </Box>

        <SubSectionTitle>
          Б. Аналитични и статистически бисквитки
        </SubSectionTitle>
        <BodyText>
          Тези „бисквитки" ни помагат да разберем как потребителите
          взаимодействат с нашата платформа (кои продукти се търсят
          най-често, колко време се прекарва на сайта, кои категории са
          най-популярни). Тази информация е изцяло анонимизирана и се използва
          единствено за подобряване на интерфейса и бързината на сайта
          (например чрез инструменти като Google Analytics).
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Правно основание:">
            Вашето изрично съгласие.
          </BulletText>
        </Box>

        <SubSectionTitle>
          В. Маркетингови и реферални (афилиейт) бисквитки
        </SubSectionTitle>
        <BodyText>
          Когато кликнете върху бутона „Към магазина", за да разгледате или
          закупите продукт от наш партньорски онлайн магазин, тези „бисквитки"
          регистрират пренасочването. Това ни позволява да отчетем успешния
          трафик към търговците. Те могат да се използват и за показване на
          по-релевантни реклами.
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Правно основание:">
            Вашето изрично съгласие.
          </BulletText>
        </Box>

        {/* 3 */}
        <SectionTitle>
          3. Списък на използваните технологии от трети страни
        </SectionTitle>
        <BodyText>
          За постигане на горните цели, нашата платформа интегрира услуги от
          утвърдени външни доставчици:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Google Analytics:">
            За уеб анализи и статистика на трафика.
          </BulletText>
          <BulletText title="Афилиейт мрежи:">
            За проследяване на реализациите при пренасочване към партньорски
            магазини.
          </BulletText>
        </Box>
        <InfoBox>
          Партньорските онлайн магазини, към които Ви пренасочваме, използват
          свои собствени „бисквитки" на техните сайтове, които се уреждат от
          техните политики за поверителност.
        </InfoBox>

        {/* 4 */}
        <SectionTitle>4. Колко дълго се съхраняват данните?</SectionTitle>
        <BodyText>
          „Бисквитките" се делят на два вида спрямо продължителността им:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Сесийни бисквитки (Session cookies):">
            Те са временни и се изтриват автоматично, когато затворите Вашия
            браузър.
          </BulletText>
          <BulletText title="Постоянни бисквитки (Persistent cookies):">
            Те остават на Вашето устройство за определен период от време (напр.
            няколко дни, месеци или до 1 година) или докато не ги изтриете
            ръчно.
          </BulletText>
        </Box>

        {/* 5 */}
        <SectionTitle>
          5. Как можете да контролирате и изтривате „бисквитките"?
        </SectionTitle>
        <BodyText>
          Вие имате пълен контрол над „бисквитките", които се съхраняват на
          Вашето устройство.
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Чрез нашия сайт:">
            Можете по всяко време да промените предпочитанията си или да
            оттеглите даденото съгласие чрез панела за настройки на бисквитки,
            разположен в долната част на всяка страница.
          </BulletText>
          <BulletText title="Чрез Вашия браузър:">
            Повечето модерни браузъри Ви позволяват да блокирате или изтривате
            „бисквитките" глобално за всички сайтове — в настройките на Google
            Chrome, Mozilla Firefox, Microsoft Edge или Safari.
          </BulletText>
        </Box>
        <InfoBox>
          <strong>Важно:</strong> Блокирането на всички „бисквитки" (включително
          необходимите) може да доведе до влошаване на функционалността на сайта
          и някои елементи да спрат да се визуализират правилно.
        </InfoBox>

        {/* 6 */}
        <SectionTitle>6. Промени в политиката</SectionTitle>
        <BodyText>
          Настоящата Политика за „бисквитките" може да бъде актуализирана
          периодично, за да отразява промени в технологиите или
          законодателството. Всички изменения ще бъдат публикувани своевременно
          на тази страница.
        </BodyText>

        <Divider sx={{ mt: 5, mb: 3 }} />

        <Typography variant="h6" fontWeight={400} color="text.secondary">
          За въпроси относно нашата употреба на „бисквитки", моля свържете се с
          нас на{" "}
          <Typography
            component="a"
            href="mailto:info@chekni.bg"
            variant="h6"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            info@chekni.bg
          </Typography>
          .
        </Typography>
      </Container>

      <Footer />
    </>
  );
}

export default CookiePolicyPage;
