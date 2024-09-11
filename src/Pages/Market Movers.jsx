import React, { useContext } from "react";
import { TrendingContext } from "../Context/TrendingContext";
import TrendingCoins from "../Components/TrendingCoins";
import { Outlet } from "react-router-dom";
import { HiOutlineRefresh } from "react-icons/hi";
import { motion } from "framer-motion";

const MarketMovers = () => {
  const { trendData, isSpinning, handleClickForRefresh } =
    useContext(TrendingContext);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 120,
      boxShadow: "0 0 1px rgba(0,255,255, 1)",
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 1,
      rotate: -360,
      boxShadow: "0 0 10px rgba(0,255,255,0.7)",
      transition: { duration: 0.4 },
    },
  };

  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.7)",
  };
  return (
    <>
      <section className="w-[90%] h-full mt-28 flex flex-col relative">
        <div
          className="w-full min-h-[80vh] py-7 flex flex-wrap mt-10 border-2 justify-evenly border-r-cyan border-t-cyan border-l-green border-b-green rounded "
          style={glowStyle}
        >
          {trendData &&
            trendData.map((coin) => (
              <TrendingCoins key={coin.item.coin_id} data={coin.item} />
            ))}
          <motion.button
            className="w-[2rem] flex justify-center items-center ml-4 p-1 absolute right-2 -top-5 rounded-full text-white transition-transform duration-300 ease-out"
            onClick={handleClickForRefresh}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="flex items-center justify-center w-[3rem] p-0 rounded-full transition-all duration-300">
              <HiOutlineRefresh
                size={30}
                className={`${
                  isSpinning ? "animate-spin text-cyan" : "text-cyan"
                } transition-transform duration-500 hover:text-cyan`}
              />
            </span>
          </motion.button>
        </div>
        <Outlet />
      </section>
    </>
  );
};

export default MarketMovers;
