import { Box, Container, Divider, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

function SectionTitle({ children }) {
  return (
    <Typography
      variant="h5"
      fontWeight={700}
      gutterBottom
      sx={{ mt: 5, mb: 2 }}
    >
      {children}
    </Typography>
  );
}

function BulletItem({ icon, title, body }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Box sx={{ mt: 0.3, color: "primary.main", flexShrink: 0 }}>{icon}</Box>
      <Box>
        {title && (
          <Typography variant="body1" fontWeight={600} gutterBottom>
            {title}
          </Typography>
        )}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {body}
        </Typography>
      </Box>
    </Box>
  );
}

function StepItem({ number, title, body }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          bgcolor: "primary.main",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "1rem",
          flexShrink: 0,
          mt: 0.3,
        }}
      >
        {number}
      </Box>
      <Box>
        <Typography variant="body1" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {body}
        </Typography>
      </Box>
    </Box>
  );
}

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>За нас | Chekni.bg</title>
        <meta
          name="description"
          content="Chekni.bg е независима платформа за сравнение на цени и продукти, която събира най-добрите предложения от водещите онлайн магазини в България."
        />
      </Helmet>

      <Header selectedCategory={() => {}} />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* ── Hero title ── */}
        <Typography variant="h3" fontWeight={700} gutterBottom>
          За нас
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* ── Mission ── */}
        <SectionTitle>
          Нашата мисия: Интелигентното пазаруване започва от тук
        </SectionTitle>

        <Typography
          variant="h6"
          fontWeight={400}
          sx={{ lineHeight: 1.8, mb: 2 }}
        >
          В динамичния свят на онлайн търговията, намирането на най-добрата
          оферта често изисква часове лутане между десетки сайтове, сравняване
          на условия и скрити разходи. Ние създадохме Chekni.bg, за да променим
          това.
        </Typography>

        <Typography variant="h6" fontWeight={400} sx={{ lineHeight: 1.8 }}>
          Нашата цел е проста: да дадем на потребителите пълна прозрачност,
          спестявайки им както време, така и пари. Ние сме независима платформа
          за сравнение на цени и продукти, която събира най-добрите предложения
          от водещите онлайн магазини в България на едно място.
        </Typography>

        {/* ── What we do ── */}
        <SectionTitle>Какво правим?</SectionTitle>

        <Typography
          variant="h6"
          fontWeight={400}
          sx={{ lineHeight: 1.8, mb: 3 }}
        >
          Ние не сме онлайн магазин и не продаваме продукти директно. Ние сме
          Вашият дигитален пътеводител в пазаруването. Чрез иновативна
          технология и интуитивен интерфейс, платформата Ви позволява:
        </Typography>

        <BulletItem
          icon={<CompareArrowsOutlinedIcon sx={{ fontSize: 28 }} />}
          title="Да сравнявате моментално:"
          body="Открийте кои търговци предлагат търсения от Вас продукт и на каква цена."
        />
        <BulletItem
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 28 }} />}
          title="Да пазарувате информирано:"
          body="Филтрирайте офертите не само по цена, но и по наличност и условия на доставка."
        />
        <BulletItem
          icon={<SearchOutlinedIcon sx={{ fontSize: 28 }} />}
          title="Да спестявате време:"
          body="Вместо да отваряте десетки табове в браузъра си, получавате цялата пазарна картина в един единствен екран."
        />

        {/* ── How it works ── */}
        <SectionTitle>Как работи платформата?</SectionTitle>

        <StepItem
          number={1}
          title="Търсене"
          body="Въвеждате продукта, който Ви интересува, в нашата търсачка."
        />
        <StepItem
          number={2}
          title="Сравнение"
          body="Разглеждате списъка с онлайн магазини, които го предлагат, подредени по цена или популярност."
        />
        <StepItem
          number={3}
          title="Покупка"
          body='Когато намерите идеалната оферта, кликвате върху бутона „Към магазина". Ние Ви пренасочваме директно към сайта на избрания търговец, където можете да завършите поръчката си сигурно и лесно.'
        />

        {/* ── Why trust us ── */}
        <SectionTitle>Защо да ни се доверите?</SectionTitle>

        <BulletItem
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 28 }} />}
          title="Независимост и обективност:"
          body="Ние показваме реалните оферти на пазара, за да можете да вземете най-доброто решение за Вашия бюджет."
        />
        <BulletItem
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 28 }} />}
          title="Фокус върху потребителя:"
          body="Разработихме платформата с мисъл за бързина, лесно навигиране и чист дизайн без излишно разсейване."
        />
        <BulletItem
          icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />}
          title="Подкрепа за бизнеса:"
          body="Свързваме качествените онлайн магазини в България с мотивирани купувачи, помагайки на електронната търговия да расте устойчиво."
        />

        {/* ── CTA ── */}
        <Divider sx={{ mt: 4, mb: 3 }} />

        <Typography variant="h6" fontWeight={400} sx={{ lineHeight: 1.8 }}>
          Имате въпроси или искате да партнирате с нас?{" "}
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
        </Typography>
      </Container>

      <Footer />
    </>
  );
}

export default AboutPage;
