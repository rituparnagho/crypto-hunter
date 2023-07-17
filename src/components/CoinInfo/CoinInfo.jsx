import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../../config/api";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import "./CoinInfo.css";
import { chartDays } from "../../config/data";
import SelectButton from "../SelectButton";
Chart.register(CategoryScale);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricalData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data: ", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const formatTime = (timestamp) => {
    let date = new Date(timestamp);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  };

  const data = {
    labels: historicalData.map((coin) => formatTime(coin[0])),
    datasets: [
      {
        data: historicalData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      },
    ],
  };

  const options = {
    animation: false,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, offset: true },
      y: {
        title: { text: "amount", display: true },
        grid: { display: false },
      },
    },
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coininfo_container">
        {!historicalData.length ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={data}
              options={{
                options,
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    // setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}

        {/* buttons */}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;

// import React, { useEffect, useState } from "react";
// import "./CoinInfo.css";
// import { CryptoState } from "../../CryptoContext";
// import axios from "axios";
// import { HistoricalChart } from "../../config/api";
// import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
// import { Line } from "react-chartjs-2";

// const CoinInfo = ({ coin }) => {
//   const [historicalData, setHistoricalData] = useState([]);
//   const [days, setDays] = useState(1);

//   const { currency, symbol } = CryptoState();

//   const fetchHistoricalData = async () => {
//     const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
//     setHistoricalData(data.prices);
//   };
//   console.log("historicalData", historicalData);
//   useEffect(() => {
//     fetchHistoricalData();
//   }, [currency, days]);

//   const data = {
//     labels: historicalData.map((coin) => {
//       let date = new Date(coin[0]);
//       let time =
//         date.getHours() > 12
//           ? `${date.getHours() - 12}:${date.getMinutes()} PM`
//           : `${date.getHours()}:${date.getMinutes()} AM`;

//       return days === 1 ? time : date.toLocaleDateString();
//     }),

//     datasets: [{ data: historicalData.map((coin) => coin[1]) }],
//   };

//   const options = {
//     animation: false,
//     maintainAspectRatio: false,
//     /*elements: { line: { tension: 0.4 } },*/
//     scales: {
//       x: { grid: { display: false }, offset: true },
//       y: {
//         title: { text: "amount", display: true },
//         grid: { display: false },
//       },
//     },
//   };

//   // new Chart(document.querySelector("#line-chart"), {
//   //   type: "line",
//   //   data,
//   //   options,
//   // });

//   const darkTheme = createTheme({
//     palette: {
//       mode: "dark",
//     },
//   });
//   console.log("data", data);

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div className="coininfo_container">
//         {!historicalData ? (
//           <CircularProgress
//             style={{ color: "gold" }}
//             size={250}
//             thickness={1}
//           />
//         ) : (
//           <Line data={data} />
//         )}

//         {/* buttons */}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default CoinInfo;
