import React, { useContext, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../Context/CryptoContext";

const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"; // Format billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"; // Format millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"; // Format thousands
  } else {
    return num.toFixed(2); // Keep small numbers as-is
  }
};

const CustomTooltip = ({ active, payload, label, curr = "usd" }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan ">
          {`${label} : ${new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: curr,
            minimumFractionDigits: 2,
          }).format(payload[0].value)}`}
        </p>
      </div>
    );
  }

  return null;
};

const ChartComponent = ({ data, curr, type }) => {
  return (
    <ResponsiveContainer width={700} height="70%">
      <LineChart
        data={data}
        margin={{ top: 2, right: 30, bottom: 50, left: 10 }}
      >
        <Line
          type="monotone"
          dataKey={type}
          stroke="#EAC308"
          strokeWidth={"1.5px"}
        />
        <CartesianGrid stroke="#CCC" strokeDasharray="1 5" />
        <XAxis dataKey="date" stroke="#00ffff" />
        <YAxis
          stroke="#00ffff"
          tickFormatter={(tick) => formatNumber(tick)}
          domain={["auto", "auto"]}
        />
        <Tooltip content={<CustomTooltip curr={curr} />} cursor={false} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chart, setChart] = useState([]);
  const [coinData, setCoinData] = useState(null); // State to store coin data
  const { curr } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    const getCoinDetails = async (id) => {
      try {
        // Fetch coin details including market cap rank
        const coinResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const coinData = await coinResponse.json();
        setCoinData(coinData); // Update coin data state

        // Fetch chart data
        const chartResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        const chartData = await chartResponse.json();
        let convertedData = chartData[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });
        setChart(convertedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCoinDetails(id);
  }, [id, type, days]);

  const glow = {
    boxShadow: "0 0 4px rgba(120, 170, 150, 1)",
  };

  return (
    <>
      <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }} className="w-screen h-full flex items-center justify-center relative -left-52">
        <ChartComponent data={chart} curr={curr} type={type} />
        <div className="flex flex-col relative bottom-12 left-10 gap-y-2 text-sm">
          <button
            className={`relative p-1  rounded-full bg-opacity-20 border border-transparent font-medium hover:text-gray-300 hover:bg-gradient-to-r hover:from-cyan hover:to-green transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan hover:scale-110 ${
              type === "prices"
                ? "bg-gradient-to-r from-cyan to-green text-gray-300"
                : ""
            }`}
            style={glow}
            onClick={() => setType("prices")}
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            Prices
          </button>

          <button
            className={`relative p-1 rounded-full bg-opacity-20 border border-transparent font-medium hover:text-gray-300 hover:bg-gradient-to-r hover:from-cyan hover:to-green transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan hover:scale-110 ${
              type === "market_caps"
                ? "bg-gradient-to-r from-cyan to-green text-gray-300"
                : ""
            }`}
            style={glow}
            onClick={() => setType("market_caps")}
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            Market caps
          </button>

          <button
            className={`relative p-1  rounded-full bg-opacity-20 border border-transparent font-medium hover:text-gray-300 hover:bg-gradient-to-r hover:from-cyan hover:to-green transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan hover:scale-110 ${
              type === "total_volumes"
                ? "bg-gradient-to-r from-cyan to-green text-gray-300"
                : ""
            }`}
            style={glow}
            onClick={() => setType("total_volumes")}
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            Total volumes
          </button>

          <button
            className={`relative p-1  rounded-full bg-opacity-20 border border-transparent font-medium hover:text-white hover:bg-gradient-to-r hover:from-red hover:to-gray-200 transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan hover:scale-110 ${
              days === 7
                ? "bg-gradient-to-r from-red to-gray-200 text-white"
                : ""
            }`}
            style={glow}
            onClick={() => setDays(7)}
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            7 days
          </button>

          <button
            className={`relative p-1  rounded-full bg-opacity-20 border border-transparent font-medium hover:text-white hover:bg-gradient-to-r hover:from-red hover:to-gray-200 transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan hover:scale-110 ${
              days === 14
                ? "bg-gradient-to-r from-red to-gray-200 text-white"
                : ""
            }`}
            style={glow}
            onClick={() => setDays(14)}
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            14 days
          </button>

          <button
            className={`relative p-1  rounded-full bg-opacity-20 border border-transparent font-medium hover:text-white hover:bg-gradient-to-r hover:from-red hover:to-gray-200 transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan hover:scale-110 ${
              days === 30
                ? "bg-gradient-to-r from-red to-gray-200 text-white"
                : ""
            }`}
            style={glow}
            onClick={() => setDays(30)}
          >
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            30 days
          </button>
        </div>
        <motion.div  initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center relative left-32 bottom-16 bg-gradient-to- from-cyan to-red p-4 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer  border-l-cyan border-t-cyan border-b-green border-2 border-r-green"
          style={glow}
        >
          <h3 className="text-lg font-medium text-c  uppercase">
            Market Cap Rank
          </h3>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-red to-gray-300 animate-pulse ">
            {coinData ? coinData.market_cap_rank : "Loading..."}
          </span>
          <div className="mt-1 w-[70%] h-0.5 bg-gradient-to-r from-cyan to-red rounded-full"></div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Chart;
