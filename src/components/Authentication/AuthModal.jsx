import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar, Fade, Tab, Tabs, createTheme } from "@mui/material";
import "./AuthModal.css";
import { ThemeProvider } from "@emotion/react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("1");

  const { setAlert } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(value);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: err.message,
          type: "error",
        });
        return;
      });
  };

  //   const theme = createTheme({
  //     palette: {
  //       primary: "blue",
  //     },
  //   });

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <div
            className="paper"
            style={{
              width: 330,
              backgroundColor: "#222",
              color: "white",
              borderRadius: 10,
            }}
          >
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                onChange={handleChange}
                value={value}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Signup" />
              </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className="google">
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
