import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotesPage } from "./pages/NotesPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export function RoutePages() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<NotesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
