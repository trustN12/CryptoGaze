import React, { useContext, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { CryptoContext } from "../Context/CryptoContext";
import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);

  const handlePageSubmit = (e) => {
    e.preventDefault();
    let valuePage = inputRef.current.value;

    if (valuePage !== 0) {
      setPerPage(valuePage);
      inputRef.current.value = valuePage;
    }
  };

  const glowStyle = {
    boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
  };

  const glowStyleForSubmit = {
    boxShadow: "0 0 7px rgba(125, 125, 200, 0.7)",
  };

  const inputRef = useRef(null);

  return (
    <form
      className="relative flex items-center mr-12"
      onSubmit={handlePageSubmit}
    >
      <label
        htmlFor="coinsperpage"
        className="relative flex justify-center items-center mr-2  font-bold"
      >
        perpage:{" "}
      </label>
      <motion.input
        type="number"
        placeholder="10"
        min={1}
        max={250}
        ref={inputRef}
        className="w-14 rounded bg-gray-200 pl-2 required outline-0 border border-transparent focus:border-b-cyan focus:border-l-cyan focus:border-t-green focus:border-r-green  leading-5"
        style={glowStyle}
        initial={{ scale: 1 }}
        whileFocus={{ scale: 1.05, transition: { duration: 0.3 } }}
      />
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 10px rgba(125, 125, 200, 0.7)",
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        type="submit"
        className="flex items-center justify-center p-1 leading-2  ml-2 bg-gradient-to-r from-red to-gray-200 hover:from-cyan hover:to-green hover:text-gray-300 text-white text-sm rounded-full shadow-md transform hover:scale-110  active:scale-100 "
        style={glowStyleForSubmit}
      >
        <IoMdSend size={20} className="mr-1 animate-pulse" />
        <span>Submit</span>
      </motion.button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPagesContext, perPage, data } =
    useContext(CryptoContext);

  const totalPage = Math.ceil(totalPagesContext / perPage);
  const next = () => {
    page === totalPage ? null : setPage(page + 1);
  };
  const previous = () => {
    page === 1 ? null : setPage(page - 1);
  };
  const jumpBtnNext = () => {
    page + 3 >= totalPage ? setPage(totalPage - 1) : setPage(page + 3);
  };

  const jumpBtnPrev = () => {
    page - 3 <= 1 ? setPage(page + 1) : setPage(page - 2);
  };

  if (data && data.length >= perPage) {
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button
              className="outline-0 hover:text-green w-5"
              onClick={previous}
            >
              <FaChevronLeft className="w-full h-5 " />
            </button>
          </li>
          {page + 1 === totalPage || page === totalPage ? (
            <li>
              <button
                onClick={jumpBtnPrev}
                className="outline-0 hover:text-green rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={previous}
                className="outline-0 hover:text-green rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-green text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>
          {page + 1 !== totalPage && page !== totalPage ? (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-green rounded-full w-8 h-8 flex items-center justify-center mx-1.5 bg-gray-200"
              >
                {page + 1}
              </button>
            </li>
          ) : null}
          {page + 1 !== totalPage && page !== totalPage ? (
            <li>
              <button
                onClick={jumpBtnNext}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page !== totalPage ? (
            <li>
              <button
                onClick={() => setPage(totalPage)}
                className="outline-0 hover:text-green rounded-full w-8 h-8 flex items-center justify-center mx-1.5 bg-gray-200"
              >
                {totalPage}
              </button>
            </li>
          ) : null}
          <li className="flex items-center">
            <button className="outline-0 hover:text-green w-5" onClick={next}>
              <FaChevronRight className="w-full h-5  " />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
