import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import AuthModal from "../Authentication/AuthModal";
import UserSidebar from "../UserSidebar/UserSidebar";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className="title"
              variant="h6"
            >
              Crypto Hunter
            </Typography>

            <Select
              varient="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
