import { Helmet } from "react-helmet-async";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Страницата не е намерена - Сравни цени | Chekni.bg</title>
      </Helmet>
      <h1>Not found paage</h1>
    </>
  );
}
export default NotFoundPage;
