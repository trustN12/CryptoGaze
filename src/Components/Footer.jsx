import React from "react";
import {
  AiOutlineContacts,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineYoutube,
} from "react-icons/ai";
import { motion } from "framer-motion";

const Footer = () => {
  const glowStyle = {
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
  };
  return (
    <footer className="relative bg-gradient-to-tr from-gray-300 to-gray-100 top-96 bottom-0 w-full bg-gray-200 bg-opacity-35  text-white py-5 px-20 border border-l-2 border-r-2 border-l-white border-t-white border-r-white rounded-md " style={glowStyle}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center -ml-3  md:text-left mb-4 md:mb-0"
        >
          <h1 className="text-2xl font-bold text-cyan text-opacity-90">
            CryptoGaze
          </h1>
          <p className="text-gray-100 text-sm">
            {" "}
            © 2024 CryptoGaze by Nabarun | All Rights Reserved
          </p>
        </motion.div>

        {/* Right Section */}
        <div className="flex space-x-5 ">
          <motion.a
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="https://github.com/trustN12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 "
          >
            <AiOutlineGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="https://youtube.com/@algo-bot?si=RMS5LISa6tj2VKQs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red"
          >
            <AiOutlineYoutube className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="mailto:academyshreyn12@gmail.com"
            className="hover:text-cyan hover:text-opacity-80"
          >
            <AiOutlineMail className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            href="tel:+919679188394"
            className="hover:text-green hover:text-opacity-80"
          >
            <AiOutlinePhone className="w-6 h-6" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
