import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Fab from "@mui/material/Fab";
import s from "./style.module.css";

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fab
      className={s.backToTop}
      variant="extended"
      color="primary"
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon />
    </Fab>
  );
}
