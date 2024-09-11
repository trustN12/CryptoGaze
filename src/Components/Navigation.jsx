import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navigation = () => {
  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.5)",
  };

  const navVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 2.2, ease: "easeOut" },
    },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className="w-[40%]  mt-16 flex justify-around align-middle border-2 border-r-green border-l-cyan border-t-green border-b-cyan rounded-lg  "
      style={glowStyle}
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `w-full  text-base text-center font-mono m-2.5  border-0 cursor-pointer rounded capitalize font-semibold  ${
            isActive
              ? "bg-red text-white "
              : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
          }`;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full  text-base text-center font-mono m-2.5  border-0 cursor-pointer rounded capitalize font-semibold  ${
            isActive
              ? "bg-red text-white "
              : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 "
          }`;
        }}
      >
        Popular
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full text-base text-center font-mono m-2.5  border-0 cursor-pointer rounded capitalize font-semibold  ${
            isActive
              ? "bg-red text-white "
              : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 "
          }`;
        }}
      >
        Saved
      </NavLink>
    </motion.nav>
  );
};

export default Navigation;
