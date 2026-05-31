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

function BulletText({ children }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 1 }}>
      <Typography
        variant="h6"
        fontWeight={400}
        sx={{ color: "primary.main", flexShrink: 0 }}
      >
        •
      </Typography>
      <Typography variant="h6" fontWeight={400} sx={{ lineHeight: 1.8 }}>
        {children}
      </Typography>
    </Box>
  );
}

export function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Общи условия | Chekni.bg</title>
        <meta
          name="description"
          content="Общи условия за ползване на платформата Chekni.bg — правила, отговорности и права на потребителите."
        />
      </Helmet>

      <Header selectedCategory={() => {}} />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Общи условия за ползване на платформата
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
          Добре дошли в Chekni.bg. Моля, прочетете внимателно настоящите Общи
          условия преди да използвате услугите на платформата.
        </BodyText>

        {/* 1 */}
        <SectionTitle>1. Общи разпоредби и дефиниции</SectionTitle>
        <BodyText>
          1.1. Настоящият документ урежда отношенията между собственика на
          платформата, от една страна, и потребителите на интернет страницата
          www.chekni.bg (наричани по-долу „Потребители"), от друга.
        </BodyText>
        <BodyText>
          1.2. Chekni.bg е информационна платформа – агрегатор и сравнител на
          оферти. Сайтът предоставя на Потребителите възможност за безплатно
          търсене, филтриране и сравняване на цени и характеристики на стоки,
          предлагани от трети лица (онлайн магазини/партньори).
        </BodyText>

        {/* 2 */}
        <SectionTitle>
          2. Характер на услугите. Ограничение на отговорността
        </SectionTitle>
        <BodyText>
          2.1. Платформата <strong>НЕ е онлайн магазин</strong>, не продава
          стоки, не приема плащания и не обработва поръчки.
        </BodyText>
        <BodyText>
          2.2. Всички сделки за покупко-продажба на стоки се сключват директно
          между Потребителя и съответния онлайн магазин, към който Потребителят
          бива пренасочен (чрез бутона „Към магазина" или сходен линк).
        </BodyText>
        <BodyText>2.3. Администраторът не носи отговорност за:</BodyText>
        <Box sx={{ pl: 2, mb: 1.5 }}>
          <BulletText>
            Актуалността, точността и изчерпателността на информацията (цени,
            наличности, описания, снимки), предоставена от електронните
            магазини.
          </BulletText>
          <BulletText>
            Качеството, безопасността, доставката, гаранционното обслужване или
            съответствието на стоките, закупени от магазините на трети лица.
          </BulletText>
          <BulletText>
            Евентуални вреди или пропуснати ползи, възникнали в резултат на
            взаимоотношенията между Потребителя и търговците.
          </BulletText>
        </Box>

        {/* 3 */}
        <SectionTitle>3. Права и задължения на потребителите</SectionTitle>
        <BodyText>
          3.1. Потребителят има право да ползва ресурсите на Платформата
          свободно и безплатно за лични, некомерсиални цели.
        </BodyText>
        <BodyText>
          3.2. При използване на сайта Потребителят се задължава:
        </BodyText>
        <Box sx={{ pl: 2, mb: 1.5 }}>
          <BulletText>
            Да не използва софтуер, роботи (scrapers/crawlers) или други
            автоматизирани средства за извличане на базата данни на Платформата
            без изрично писмено разрешение от Администратора.
          </BulletText>
          <BulletText>
            Да не извършва действия, които могат да нарушат нормалната работа на
            сайта или да претоварят инфраструктурата му.
          </BulletText>
        </Box>

        {/* 4 */}
        <SectionTitle>4. Права и задължения на Администратора</SectionTitle>
        <BodyText>
          4.1. Администраторът има право да променя дизайна, функционалностите,
          съдържанието и Общите условия на Платформата по всяко време, без
          предварително известие.
        </BodyText>
        <BodyText>
          4.2. Администраторът се стреми да поддържа информацията на сайта
          възможно най-актуална, но не гарантира непрекъснат и безгрешен достъп
          до платформата.
        </BodyText>
        <BodyText>
          4.3. Платформата си запазва правото да премахва оферти или да
          прекратява партньорства с онлайн магазини по своя преценка (например
          при некоректни практики).
        </BodyText>

        {/* 5 */}
        <SectionTitle>5. Интелектуална собственост</SectionTitle>
        <BodyText>
          5.1. Всички елементи на Платформата (включително код, софтуерни
          решения, графичен дизайн, лога, бази данни, текстове) са обект на
          авторско право и принадлежат на Администратора или на неговите
          партньори.
        </BodyText>
        <BodyText>
          5.2. Марките, логата и продуктовите снимки на трети лица (онлайн
          магазини и производители) са собственост на техните съответни
          притежатели и се използват в сайта единствено с информационна цел.
        </BodyText>

        {/* 6 */}
        <SectionTitle>6. Защита на личните данни (Поверителност)</SectionTitle>
        <BodyText>
          6.1. Платформата обработва лични данни на потребителите (като IP
          адреси, бисквитки/cookies и данни за поведението на сайта) в
          съответствие с Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на
          личните данни.
        </BodyText>
        <BodyText>
          6.2. Подробна информация за събирането, съхранението и обработката на
          данни можете да откриете в нашата Политика за поверителност.
        </BodyText>

        {/* 7 */}
        <SectionTitle>7. Заключителни разпоредби</SectionTitle>
        <BodyText>
          7.1. За всички неуредени в настоящите Общи условия въпроси се прилага
          действащото законодателство на Република България.
        </BodyText>
        <BodyText>
          7.2. Всички спорове между Администратора и Потребителите ще се
          разрешават в дух на разбирателство, а при невъзможност за това — от
          компетентния български съд.
        </BodyText>

        <Divider sx={{ mt: 5, mb: 3 }} />

        <Typography variant="h6" fontWeight={400} color="text.secondary">
          За въпроси относно настоящите Общи условия, моля свържете се с нас на{" "}
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

export default TermsPage;
