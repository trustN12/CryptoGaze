import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TrendingCoins = ({ data }) => {
  let navigate = useNavigate();

  const getCoinsDetails = (id) => {
    navigate(id);
  };

  return (
    <motion.div
      initial={{ scale: 1, rotateY: 0 }}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        boxShadow:
          "0px 20px 30px rgba(0, 255, 255, 0.6), inset 0px 0px 10px rgba(0, 255, 255, 0.8)",
        backgroundColor: "#1a1a1a",
        transition: { duration: 0.4 },
        transform: "perspective(1000px) rotateY(10deg)",
        zIndex: 10,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="w-[30%] bg-gray-200 mb-7 relative top-4 rounded-lg p-5 cursor-pointer hover:bg-gray-100 hover:bg-opacity-45"
      onClick={() => getCoinsDetails(data.id)}
    >
      {data ? (
        <>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-md flex items-center my-0.5 "
          >
            <span className="text-gray-100 ">ID : &nbsp; </span>
            <span className=" text-base text-cyan">{data.name}</span>
          </motion.h3>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-md flex items-center my-0.5 "
          >
            <span className="text-gray-100 ">Rank : &nbsp; </span>
            <span className="text-md text-cyan">{data.market_cap_rank}</span>
          </motion.h3>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-md flex items-center my-0.5 "
          >
            <span className="text-gray-100 ">Price (in btc) : &nbsp; </span>
            <span className="text-md text-cyan">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 2,
              }).format(data.price_btc)}
            </span>
          </motion.h3>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-md flex items-center my-0.5 "
          >
            <span className="text-gray-100 ">No. : &nbsp; </span>
            <span className="text-md text-cyan">{data.score}</span>
          </motion.h3>

          <motion.img
            src={data.large}
            alt={data.name}
            className="rounded-full w-[15%] h-auto absolute bottom-20 right-4 -translate-x-2 translate-y-24"
            animate={{
              y: ["0%", "-10%", "0%", "10%", "0%"], // Simulates bobbing up and down
              rotate: [0, -5, 5, 0], // Gentle tilt to mimic natural motion
              scale: [1, 1.05, 1, 1.05, 1], // Slight scaling for added effect
            }}
            transition={{
              duration: 2, // Duration of one full cycle
              repeat: Infinity, // Repeat indefinitely
              repeatType: "loop", // Loop the animation
              ease: "easeInOut", // Smooth easing
            }}
          />
        </>
      ) : null}
    </motion.div>
  );
};

export default TrendingCoins;
