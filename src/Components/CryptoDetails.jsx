import React, { useContext, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../Context/CryptoContext";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineClose,
} from "react-icons/ai";
import Chart from "./Chart";
import { motion } from "framer-motion";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const range = high - low;
  const percentageHigh = ((currentPrice - low) / range) * 100;
  const percentageLow = 100 - percentageHigh;

  return (
    <div
      className="relative w-full h-2 rounded-lg border border-opacity-70 border-cyan  bg-gray-300"
      style={{ boxShadow: "0 0 4px rgba(200, 200, 100, 1" }}
    >
      <span
        className="absolute top-0 left-0 h-full bg-red  rounded-l-lg"
        style={{ width: `${percentageHigh}%` }}
      />
      <span
        className="absolute top-0 right-0 h-full bg-green rounded-r-lg"
        style={{ width: `${percentageLow}%` }}
      />
    </div>
  );
};

const CryptoDetails = () => {
  let { getCoinDetails, coinData: Coin_url, curr } = useContext(CryptoContext);

  let navigate = useNavigate();
  let { coinId } = useParams();

  useLayoutEffect(() => {
    getCoinDetails(coinId);
  }, [coinId]);

  const closePopup = () => {
    navigate("..");
  };

  const glow = {
    boxShadow: "0 0 5px rgba(200, 255, 255, 0.7)",
  };

  const priceChange = Coin_url?.market_data?.price_change_percentage_24h;
  const isPositive = priceChange > 0;
  const priceChangeColor = isPositive ? "text-green" : "text-red";
  const indicatorIcon =
    priceChange > 0 ? (
      <AiOutlineArrowUp className="text-green" />
    ) : (
      <AiOutlineArrowDown className="text-red" />
    );

  return createPortal(
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-cyan bg-opacity-10 backdrop-blur-md flex items-center justify-center"
    >
      <div className="w-[90%] h-[90%] bg-cyan bg-opacity-10 rounded-lg text-white relative">
        <button
          onClick={closePopup}
          className="p-1 rounded absolute top-2 right-2 hover:bg-cyan hover:bg-opacity-10 focus:outline-none"
        >
          <AiOutlineClose className="h-5 w-5 text-white" />
        </button>

        {Coin_url ? (
          <div className="flex h-full w-full p-4">
            {/* Left Section */}
            <div className="w-[45%] pr-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <img
                  className="w-[2rem] h-[2rem] mx-2"
                  src={Coin_url.image.large}
                  alt={Coin_url.id}
                />
                <h1 className="text-xl capitalize font-medium">
                  {Coin_url.name}
                </h1>
                <span
                  className="text-sm py-0.5 px-2.5 ml-2 bg-cyan bg-opacity-10 border border-green animate-pulse rounded uppercase"
                  style={glow}
                >
                  {Coin_url.symbol}
                </span>
              </motion.div>

              {/* Price and Price Change Indicator */}
              <div className="mt-6 flex items-center">
                <div className="flex flex-col">
                  <span className="text-sm px-1 text-white text-opacity-50">
                    Price
                  </span>
                  <h2 className="text-lg font-bold mt-2">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: curr,
                      maximumSignificantDigits: 5,
                    }).format(Coin_url.market_data.current_price[curr])}
                  </h2>
                </div>

                {/* Price change indicator */}
                <div
                  className={`flex items-center ml-2 font- mb-7  ${priceChangeColor} `}
                >
                  {indicatorIcon}
                  <span className="ml-1 text-base">
                    {priceChange.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Additional Coin Info */}
              <div className="mt-6">
                <span className="text-sm px-1 text-white text-opacity-50">
                  Market Cap
                </span>
                <h2 className="text-base font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: curr,
                    minimumFractionDigits: 0,
                  }).format(Coin_url.market_data.market_cap[curr])}
                </h2>
              </div>

              <div className="mt-6">
                <span className="text-sm px-1 text-white text-opacity-50">
                  Total Volume
                </span>
                <h2 className="text-base font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: curr,
                    minimumFractionDigits: 0,
                    notation: "compact",
                  }).format(Coin_url.market_data.total_volume[curr])}
                </h2>
              </div>

              {/* HighLowIndicator */}
              <div className="mt-5">
                <span className="">
                  <HighLowIndicator
                    currentPrice={Coin_url.market_data.current_price[curr]}
                    high={Coin_url.market_data.high_24h[curr]}
                    low={Coin_url.market_data.low_24h[curr]}
                  />
                </span>
              </div>

              <div className=" w-full h-[75%] mx-10   relative bottom-10 ">
                <Chart id={Coin_url.id} />
              </div>
            </div>

            {/* Right Section */}
            <div className="w-[30%] pl-4">
              <div className="flex justify-between">
                {/* High 24H */}
                <div className="flex flex-col -ml-1">
                  <span className="text-sm px-1 text-white text-opacity-50">
                    High 24H
                  </span>
                  <h2 className="text-base font-medium">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: curr,
                      minimumFractionDigits: 2,
                    }).format(Coin_url.market_data.high_24h[curr])}
                  </h2>
                </div>

                {/* Low 24H */}
                <div className="flex flex-col">
                  <span className="text-sm px-1 text-white text-opacity-50">
                    Low 24H
                  </span>
                  <h2 className="text-base font-medium">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: curr,
                      minimumFractionDigits: 2,
                    }).format(Coin_url.market_data.low_24h[curr])}
                  </h2>
                </div>
              </div>

              <div className="text-sm ">
                <h2 className="text-sm text-white text-opacity-50 pt-4">
                  Votes
                </h2>
                <div className="flex flex-col gap-y-1">
                  {/* Up Percentage */}
                  <span
                    className={`font-bold ${
                      Number(Coin_url.sentiment_votes_up_percentage).toFixed(
                        2
                      ) <
                      Number(Coin_url.sentiment_votes_down_percentage).toFixed(
                        2
                      )
                        ? "text-red"
                        : "text-green"
                    }`}
                  >
                    {Number(Coin_url.sentiment_votes_up_percentage).toFixed(2)}%
                  </span>
                  {/* Down Percentage */}
                  <span
                    className={`font-bold ${
                      Number(Coin_url.sentiment_votes_down_percentage).toFixed(
                        2
                      ) >=
                      Number(Coin_url.sentiment_votes_up_percentage).toFixed(2)
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {Number(Coin_url.sentiment_votes_down_percentage).toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-sm px-1 text-white text-opacity-50">
                  Max Supply
                </span>
                <h2 className="text-base font-medium">
                  {Coin_url.market_data.max_supply
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: curr,
                        notation: "compact",
                      }).format(Coin_url.market_data.max_supply)
                    : "N/A"}
                </h2>
              </div>

              <div className="mt-6">
                <span className="text-sm px-1 text-white text-opacity-50">
                  Circulating Supply
                </span>
                <h2 className="text-base font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: curr,
                    minimumFractionDigits: 0,
                    notation: "compact",
                  }).format(Coin_url.market_data.circulating_supply)}
                </h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-24 -ml-16"
            >
              <div className="pl-10 font-bold text-cyan">Links</div>
              <div className="flex flex-col mt-3 -ml-4">
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  className="text-sm text-gray-100 bg-gray-200 px-1.5 py-1 my-1 rounded hover:text-cyan"
                  href={Coin_url?.links?.homepage[0]}
                >
                  {Coin_url?.links?.homepage[0].substring(0, 30)}
                </a>
                <a
                  rel="noreferrer"
                  target={"_blank"}
                  className="text-sm text-gray-100 bg-gray-200 px-1.5 py-1 my-1 rounded hover:text-cyan"
                  href={Coin_url?.links?.blockchain_site[0]}
                >
                  {Coin_url?.links?.blockchain_site[0].substring(0, 30)}
                </a>
                {Coin_url?.links?.official_forum_url[0] && (
                  <a
                    rel="noreferrer"
                    target={"_blank"}
                    className="text-sm text-gray-100 bg-gray-200 px-1.5 py-1 my-1 rounded hover:text-cyan"
                    href={Coin_url?.links?.official_forum_url[0]}
                  >
                    {Coin_url?.links?.official_forum_url[0].substring(0, 30)}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </div>
    </motion.div>,
    document.getElementById("popUp")
  );
};

export default CryptoDetails;
