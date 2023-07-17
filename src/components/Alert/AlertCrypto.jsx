import React from "react";
import { CryptoState } from "../../CryptoContext";
import { Alert, Snackbar } from "@mui/material";

const AlertCrypto = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        variant="filled"
        elevation={10}
        onClose={handleClose}
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertCrypto;
