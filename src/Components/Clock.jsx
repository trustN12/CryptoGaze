import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const Hours = time.getHours();
  const resultHours = Hours % 12 || 12;
  const isPM = Hours >= 12;
  const amPM = isPM ? "PM" : "AM";

  const displayHours = resultHours.toString().padStart(2, "0");
  const mins = time.getMinutes().toString().padStart(2, "0");
  const secs = time.getSeconds().toString().padStart(2, "0");

  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.7)",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute top-5 right-5 flex flex-col"
      >
        {/* Time Display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, type: "inertia", stiffness: 300 }}
          className="absolute right-3 top-1 text-base font-semibold text-white bg-gradient-to-r from-gray-200 to-gray-300 bg-opacity-30 w-[8rem] h-[2.6rem] flex items-center justify-center rounded-xl shadow-lg border-2 border-t-cyan border-r-cyan border-l-green border-b-green px-2"
          style={glowStyle}
        >
          <div className="flex text-sm space-x-1 items-center justify-center">
            <span className=" text-cyan-400 animate-pulse">{displayHours}</span>
            <span className=" text-white">:</span>
            <span className=" text-cyan-400 animate-pulse">{mins}</span>
            <span className=" text-white">:</span>
            <span className=" text-cyan-400 animate-pulse">{secs}</span>
            &nbsp;
            <span className="text-sm text-cyan font-bold">{amPM}</span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, type: "inertia", stiffness: 300 }}
              className="absolute top-10 text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan to-red animate-pulse border-2 border-t-0 border-r-cyan border-l-green border-b-cyan w-[4.5rem] flex items-center justify-center rounded-lg shadow-lg "
              style={glowStyle}
            >
              <span>
                {`${String(time.getDate()).padStart(2, "0")}-${String(
                  time.getMonth() + 1
                ).padStart(2, "0")}-${time.getFullYear()}`}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Date Display */}
    </>
  );
};

export default Clock;
