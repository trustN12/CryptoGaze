import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Logo = () => {
  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.7)",
  };
  return (
    <Link
      to="/"
      className="absolute top-[1.5rem] left-[1.5rem]  w-40 [text-decoration: none]"
    >
      <motion.img
        src="assets/cryptogaze-high-resolution-logo-transparent.png"
        alt="CryptoGaze"
        style={glowStyle}
        className="rounded-xl border-2 border-r-cyan border-l-green border-t-green border-b-cyan p-1"
      />
    </Link>
  );
};

export default Logo;
