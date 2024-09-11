import React, { useContext, useRef } from "react";
import Search from "./Search";
import { AiOutlineSwap } from "react-icons/ai";
import { CryptoContext } from "../Context/CryptoContext";
import { MdMoreVert } from "react-icons/md";
import {
  HiOfficeBuilding,
  HiOutlineAnnotation,
  HiOutlineRefresh,
  HiRefresh,
  HiSparkles,
} from "react-icons/hi";
import { motion } from "framer-motion";
import { CgRedo, CgSearchLoading } from "react-icons/cg";

const Filter = () => {
  let { setCurr, setFilter, handleClick, isSpinning } =
    useContext(CryptoContext);
  const currRef = useRef(null);

  const handleCurr = (e) => {
    e.preventDefault();
    let value = currRef.current.value;
    setCurr(value);
    currRef.current.value = "";
  };
  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.5)",
  };

  const handleFilter = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setFilter(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
      className="w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative"
      style={glowStyle}
    >
      <Search />
      <div className="flex mr-7 ml-2">
        <motion.form
          className="relative flex items-center mr-12"
          onSubmit={handleCurr}
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.95, rotate: -3 }}
          transition={{ type: "inertia", stiffness: 400 }}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center mr-2  font-bold"
          >
            currency:{" "}
          </label>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "inertia", stiffness: 300 }}
            type="text"
            placeholder="usd"
            ref={currRef}
            className="w-14 rounded bg-gray-200 pl-2 required outline-0 border border-transparent focus:border-b-cyan focus:border-l-cyan focus:border-t-green focus:border-r-green  leading-5"
            
          />
          <button type="submit" className="ml-1 cursor-pointer ">
            <AiOutlineSwap className="text-cyan " />
          </button>
        </motion.form>

        <label className="relative flex justify-center items-center ">
          <span className="mr-2 font-bold">filter:</span>
          <motion.select
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 400 }}
            name="filter"
            className="rounded bg-gray-200 text-base pl-2 pr-10 py-0.5 leading-4 capitalize focus:outline-none cursor-pointer"
            onChange={handleFilter}
          >
            <option className="cursor-pointer" value="market_cap_desc">
              market cap desc
            </option>
            <option className="cursor-pointer" value="market_cap_asc">
              market cap asc
            </option>
            <option className="cursor-pointer" value="volume_asc">
              volume asc
            </option>
            <option className="cursor-pointer" value="volume_desc">
              volume desc
            </option>
            <option className="cursor-pointer" value="id_asc">
              id asc
            </option>
            <option className="cursor-pointer" value="id_desc">
              id desc
            </option>
          </motion.select>
        </label>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 360, color: "#00BFFF" }}
          whileTap={{ scale: 0.9, color: "#1E90FF" }}
          transition={{ type: "tween", stiffness: 400 }}
          className="W-[2rem] ml-10  right-0 -top-10 rounded-full  transition-transform duration-300 ease-out"
          onClick={handleClick}
        >
          <span className="flex items-center justify-center w-full h-full">
            <motion.div
              animate={{ scale: isSpinning ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            >
              <HiRefresh
                size={25}
                className={`${
                  isSpinning ? "animate-spin text-cyan" : "text-cyan"
                }`}
              />
            </motion.div>
          </span>
        </motion.button>
      </div>
      <div></div>
    </motion.div>
  );
};

export default Filter;
