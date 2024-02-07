import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function SnackBar({ open, setOpenSnackBar }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Настройките бяха запазени успешно
        </Alert>
      </Snackbar>
    </div>
  );
}
