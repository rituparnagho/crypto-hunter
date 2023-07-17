import React, { useEffect, useState } from "react";
import "./CoinPage.css";
import { useParams } from "react-router-dom";
// import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import { Button, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "html-react-parser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  // console.log("coin", coin);
  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <Typography variant="h5" className="market_data">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {coin?.market_data?.current_price[currency.toLowerCase()]}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Typography>
        {user && (
          <Button
            variant="outlined"
            style={{
              width: "100%",
              height: 40,
              backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
            }}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
          >
            {inWatchlist ? "Remove From Watchlist" : "Add to Watchlist"}
          </Button>
        )}
      </div>
      {/* chart */}

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
