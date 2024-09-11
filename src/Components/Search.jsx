import React, { useContext, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { CryptoContext } from "../Context/CryptoContext";
import debounce from "lodash.debounce";
import { motion } from "framer-motion";

const SearchInputModify = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  let { SearchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  const handleInput = (e) => {
    let store = e.target.value;
    setSearch(store);
    handleSearch(store);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    handleSearch(search);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchData();
    setSearch("");
  };

  return (
    <>
       <motion.form
        className="w-96 relative flex items-center ml-4 font-mono"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
         <motion.input
          type="text"
          name="search"
          className="w-full rounded bg-gray-100 placeholder:text-white opacity-85 pl-2 required outline-0 border-transparent border-2 focus:border-cyan focus:border-opacity-80"
          placeholder="Search Here"
          onChange={handleInput}
          value={search}
          whileHover={{
            boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.8)",
            scale: 1.05,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />

<motion.button
          type="submit"
          className="absolute right-2 cursor-pointer"
          whileHover={{
            scale: 1.2,
            rotate: 360,
            boxShadow: "0px 0px 0px rgba(0, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.5 }}
        >
          <FaSearch className="text-white hover:text-cyan" />
        </motion.button>
      </motion.form>

      {search.length > 0 ? (
        <motion.ul
        className="absolute top-10 left-4 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-40 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-corner-gray-200 scrollbar-track-gray-200 scroll-smooth"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
          {SearchData ? (
            SearchData.map((coin) => {
              return (
                <motion.li
                  className="flex items-center ml-3 my-2 cursor-pointer hover:text-cyan hover:bg-white hover:bg-opacity-20 hover:mr-3 hover:rounded  "
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                  whileHover={{
                    scale: 1.1,
                    x: 10,
                    boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.6)",
                  }}
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </motion.li>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <div
                className="w-10 h-10 border-4 border-b-cyan rounded-full animate-spin"
                role="status"
              />
            </div>
          )}
        </motion.ul>
      ) : null}
    </>
  );
};

const Search = () => {
  let { getSearchResult } = useContext(CryptoContext);

  // Memoize the debounce function to avoid recreating it on each render
  const debounceFunc = useCallback(
    debounce((value) => {
      getSearchResult(value);
    }, 1000),
    [getSearchResult]
  );

  return (
    <>
      <SearchInputModify handleSearch={debounceFunc} />
    </>
  );
};

export default Search;
