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

export function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Политика за поверителност | Chekni.bg</title>
        <meta
          name="description"
          content="Политика за поверителност и защита на личните данни на Chekni.bg — как събираме, използваме и защитаваме Вашата информация."
        />
      </Helmet>

      <Header selectedCategory={() => {}} />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Политика за поверителност и защита на личните данни
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
          В Chekni.bg сигурността и поверителността на Вашите данни са наш
          основен приоритет. Настоящата Политика за поверителност обяснява как
          събираме, използваме, споделяме и защитаваме Вашата информация, когато
          посещавате нашата интернет страница.
        </BodyText>

        {/* 1 */}
        <SectionTitle>1. Кои сме ние?</SectionTitle>
        <BodyText>
          Администратор на личните данни е собственикът на платформата Chekni.bg
          (наричан по-долу за краткост „Администратор", „Ние" или
          „Платформата").
        </BodyText>
        <BodyText>
          За въпроси, свързани с поверителността, можете да се свържете с нас на
          имейл:{" "}
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
        </BodyText>

        {/* 2 */}
        <SectionTitle>2. Какви данни събираме и защо?</SectionTitle>
        <BodyText>
          Тъй като нашата платформа е сравнител на оферти и използването ѝ не
          изисква задължителна регистрация или покупка, ние събираме ограничен
          обем от данни, свързани главно с подобряването на потребителското
          изживяване:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Технически данни и идентификатори:">
            IP адрес, вид на браузъра, операционна система, уникални
            идентификатори на устройства и информация за мрежата.
          </BulletText>
          <BulletText title="Данни за поведението (Аналитични данни):">
            Страниците, които разглеждате, продуктите, които търсите, и
            кликванията върху бутоните (например пренасочването към партньорски
            онлайн магазини чрез бутона „Към магазина").
          </BulletText>
          <BulletText title="Данни за контакт (само при доброволно предоставяне):">
            Ако се свържете с нас чрез контактната форма или имейл, ние събираме
            Вашето име, имейл адрес и съдържанието на съобщението Ви, за да
            можем да Ви отговорим.
          </BulletText>
        </Box>

        {/* 3 */}
        <SectionTitle>3. Правно основание за обработката</SectionTitle>
        <BodyText>
          Ние обработваме Вашите данни единствено на следните основания:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Легитимен интерес:">
            За осигуряване на техническата изправност и сигурността на сайта,
            както и за анализиране на ефективността на платформата.
          </BulletText>
          <BulletText title="Изрично съгласие:">
            За използването на определени маркетингови и аналитични „бисквитки"
            (Cookies), което Вие потвърждавате при първоначалното посещение на
            сайта.
          </BulletText>
        </Box>

        {/* 4 */}
        <SectionTitle>
          4. Използване на „Бисквитки" (Cookies) и инструменти за анализ
        </SectionTitle>
        <BodyText>
          За да работи сайтът ни оптимално, използваме малки текстови файлове,
          наречени „бисквитки". Те се делят на:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Необходими (системни):">
            Без тях сайтът не може да функционира правилно.
          </BulletText>
          <BulletText title="Аналитични (напр. Google Analytics):">
            Помагат ни да разберем как потребителите взаимодействат със сайта,
            кои категории са най-популярни и как да подобрим дизайна и
            интерфейса (UI/UX).
          </BulletText>
          <BulletText title="Рекламни и реферални:">
            Тъй като пренасочваме потребители към външни онлайн магазини, тези
            технологии ни помагат да отчетем успешните пренасочвания.
          </BulletText>
        </Box>
        <BodyText>
          Вие можете да управлявате и изтривате „бисквитките" по всяко време
          чрез настройките на Вашия браузър или чрез нашия Cookie банер.
        </BodyText>

        {/* 5 */}
        <SectionTitle>5. Споделяне на информация с трети страни</SectionTitle>
        <BodyText>
          Ние <strong>НЕ продаваме</strong>, не отдаваме под наем и не търгуваме
          с Вашите лични данни. Ваши данни могат да бъдат споделени само със:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText title="Доставчици на услуги (Обработващи данни):">
            Лица, които поддържат нашата хостинг инфраструктура, или инструменти
            за уеб анализи (като Google LLC), които спазват строги стандарти за
            сигурност.
          </BulletText>
          <BulletText title="Държавни органи:">
            Само в случаите, когато сме законово задължени по силата на
            българското или европейското законодателство.
          </BulletText>
        </Box>
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
          <BodyText sx={{ mb: 0 }}>
            <strong>Важно:</strong> Когато кликнете върху бутон, който Ви
            пренасочва към партньорски онлайн магазин, Вие напускате нашия сайт.
            От този момент нататък се прилага Политиката за поверителност на
            съответния търговец.
          </BodyText>
        </Box>

        {/* 6 */}
        <SectionTitle>6. Период на съхранение на данните</SectionTitle>
        <BodyText>
          Ние съхраняваме Вашите данни само толкова дълго, колкото е необходимо
          за целите, за които са събрани (например за времетраенето на сесията
          или съгласно стандартните периоди на съхранение на аналитичните
          платформи), или в рамките на законово определените срокове.
        </BodyText>

        {/* 7 */}
        <SectionTitle>7. Вашите права съгласно GDPR</SectionTitle>
        <BodyText>
          Като потребител, Вие разполагате със следните права:
        </BodyText>
        <Box sx={{ pl: 1, mb: 1.5 }}>
          <BulletText>
            Право на достъп до личните данни, които съхраняваме за Вас.
          </BulletText>
          <BulletText>
            Право на коригиране при неточни или непълни данни.
          </BulletText>
          <BulletText>
            Право на изтриване („право да бъдеш забравен"), ако липсва законово
            основание за обработката им.
          </BulletText>
          <BulletText>Право на ограничаване на обработката.</BulletText>
          <BulletText>
            Право на възражение срещу обработката, базирана на легитимен
            интерес.
          </BulletText>
        </Box>
        <BodyText>
          За да упражните някое от тези права, моля, свържете се с нас на
          посочения имейл. Имате също така право да подадете жалба до надзорния
          орган в България – Комисия за защита на личните данни (КЗЛД).
        </BodyText>

        {/* 8 */}
        <SectionTitle>8. Промени в политиката за поверителност</SectionTitle>
        <BodyText>
          Запазваме си правото да актуализираме настоящата Политика по всяко
          време, за да отразяваме промени в нашите практики или нормативните
          изисквания. Всички промени ще бъдат публикувани на тази страница с
          посочване на датата на последна актуализация.
        </BodyText>

        <Divider sx={{ mt: 5, mb: 3 }} />

        <Typography variant="h6" fontWeight={400} color="text.secondary">
          За въпроси относно настоящата Политика за поверителност, моля свържете
          се с нас на{" "}
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

export default PrivacyPage;
