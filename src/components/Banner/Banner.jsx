import { Container, Typography } from "@mui/material";
import React from "react";
import "./Banner.css";
import Carousel from "../Carousel/Carousel";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <Container className="banner__content">
          <div className="tagline">
            <Typography
              varient="h2"
              style={{
                fontWeight: "bold",
                fontSize: "60px",
                marginBottom: 15,
                fontFamily: "Montserrat",
              }}
            >
              Crypto Hunter
            </Typography>
            <Typography
              varient="subtitle2"
              style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all the Info regarding your favourite Crypto Currency
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
    </>
  );
};

export default Banner;
