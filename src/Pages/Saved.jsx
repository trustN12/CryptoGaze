import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineRefresh } from "react-icons/hi";
import { motion } from "framer-motion";
import { StorageContext } from "../Context/StorageContext";
import { CryptoContext } from "../Context/CryptoContext";

const SaveBtn = ({ data }) => {
  const { saveCoins, allcoins, removeCoins } = useContext(StorageContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleClicksave = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);

    if (allcoins && allcoins.includes(data.id)) {
      removeCoins(data.id);
    } else {
      saveCoins(data.id);
    }
  };

  return (
    <motion.button
      className=" cursor-pointer"
      onClick={(e) => handleClicksave(e)}
      whileHover={{ scale: 1.3, rotate: 360 }} // Add futuristic hover animation
      whileTap={{ scale: 1.1 }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 -43.5 1111 1111"
        fill="gray"
        className={`w-[1.5rem] ml-1.5 hover:fill-cyan ${
          allcoins.includes(data.id)
            ? "fill-cyan animate-pulse transition-colors"
            : "fill-gray-100"
        } ${isClicked ? "scale-150 drop-shadow-2xl " : ""}`} // Apply animation class
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M479.817143 780.434286l-158.72 54.857143c-1.462857 0.731429-2.194286 0.731429-2.194286 0.731428 1.462857 0 2.925714 0.731429 4.388572 1.462857 1.462857 1.462857 2.194286 2.194286 2.925714 3.657143v-2.925714l4.388571-160.182857c1.462857-42.422857-17.554286-99.474286-43.885714-133.12l-101.668571-128c-0.731429-1.462857-1.462857-2.194286-1.462858-2.194286 0 1.462857 0 3.657143-0.731428 5.851429-0.731429 2.194286-1.462857 3.657143-2.925714 4.388571 0 0 0.731429 0 2.194285-0.731429l161.645715-46.08c40.96-11.702857 89.234286-46.08 114.102857-81.188571l93.622857-133.12c0.731429-1.462857 1.462857-2.194286 1.462857-2.194286-0.731429 0.731429-2.194286 0.731429-3.657143 0.731429s-2.925714-0.731429-3.657143-0.731429c0 0 0.731429 0.731429 1.462857 2.194286l93.622858 133.12c24.137143 34.377143 73.142857 69.485714 114.102857 81.188571l161.645714 46.08c1.462857 0.731429 2.194286 0.731429 2.194286 0.731429-0.731429-0.731429-2.194286-2.925714-2.925715-4.388571-0.731429-2.194286-0.731429-4.388571-0.731428-5.851429 0 0 0 0.731429-1.462857 2.194286l-101.668572 128c-26.331429 33.645714-45.348571 89.965714-43.885714 133.12l2.194286 80.457143 2.194285 80.457142v2.925715c0.731429-0.731429 1.462857-2.194286 2.925715-3.657143 1.462857-0.731429 2.925714-1.462857 4.388571-1.462857 0 0-0.731429 0-2.194286-0.731429l-158.72-54.857143c-39.497143-14.628571-99.474286-14.628571-138.971428-0.731428z m269.165714 137.508571c59.245714 20.48 113.371429-19.017143 111.908572-81.92l-2.194286-80.457143-2.194286-80.457143c-0.731429-21.942857 11.702857-58.514286 24.868572-76.068571l101.668571-128c39.497143-49.737143 19.017143-114.102857-42.422857-131.657143l-161.645714-46.08c-21.211429-5.851429-53.394286-28.525714-66.56-46.811428l-93.622858-133.12c-35.84-51.2-103.131429-51.2-138.971428 0l-93.622857 133.12c-13.165714 18.285714-44.617143 40.96-66.56 46.811428l-161.645715 46.08c-61.44 17.554286-81.92 81.92-42.422857 131.657143l101.668572 128c13.897143 17.554286 25.6 54.125714 24.868571 76.068571l-4.388571 160.182858c-1.462857 62.902857 51.931429 102.4 111.908571 81.92l158.72-54.857143c21.211429-7.314286 60.708571-7.314286 81.92 0l158.72 55.588571z" />
        <path d="M548.571429 678.765714c-58.514286 0-125.074286 27.794286-125.074286 27.794286s10.971429-64.365714-6.582857-122.148571-65.828571-111.177143-65.828572-111.177143 76.8-20.48 124.342857-56.32 73.142857-87.771429 73.142858-87.771429 34.377143 51.931429 80.457142 87.771429c46.811429 35.108571 117.028571 56.32 117.028572 56.32s-40.228571 44.617143-58.514286 103.862857-13.897143 129.462857-13.897143 129.462857-66.56-27.794286-125.074285-27.794286z" />
        <path d="M548.571429 678.765714c-56.32-5.12-125.074286 27.794286-125.074286 27.794286s10.971429-64.365714-6.582857-122.148571-65.828571-111.177143-65.828572-111.177143l198.217143 40.228571c3.657143 145.554286 1.462857 112.64-0.731428 165.302857z" />
        <path d="M551.497143 678.765714c56.32-5.12 125.074286 27.794286 125.074286 27.794286s-10.971429-64.365714 6.582857-122.148571 65.828571-111.177143 65.828571-111.177143l-198.217143 40.228571c-3.657143 145.554286-1.462857 112.64 0.731429 165.302857z" />
      </svg>
    </motion.button>
  );
};

const Saved = () => {
  const { SavedData, isSpinning, handleClickForSaved, allcoins } =
    useContext(StorageContext);
  let { curr } = useContext(CryptoContext);

  const [filteredSavedData, setFilteredSavedData] = useState([]);

  useEffect(() => {
    if (SavedData && allcoins) {
      // Filter coins to only include saved ones
      setFilteredSavedData(
        SavedData.filter((coin) => allcoins.includes(coin.id))
      );
    }
  }, [SavedData, allcoins]);

  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.7)",
  };

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

  return (
    <>
      <section className="w-[90%] h-full mt-28 flex flex-col relative">
        <div
          className="w-full min-h-[80vh] py-7  mt-10 border-2  border-r-cyan border-t-cyan border-l-green border-b-green rounded "
          style={glowStyle}
        >
          {filteredSavedData.length > 0 ? (
            <table className="w-full table-auto">
              <thead className="capitalize text-base text-gray-100 border-b border-gray-100">
                <motion.tr
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <th className="py-2">Coin</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Rate</th>
                  <th className="py-2">Total Volume</th>
                  <th className="py-2">Mkt Cap Δ</th>
                  <th className="py-2">1Hr</th>
                  <th className="py-2">1Day</th>
                  <th className="py-2">1Wk</th>
                </motion.tr>
              </thead>

              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
              >
                {filteredSavedData.map((url) => {
                  return (
                    <motion.tr
                      key={url.id}
                      whileHover={{
                        scale: 1,
                        boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.8)",
                      }}
                      transition={{ duration: 0.4 }}
                      className="text-center text-base border-b border-gray-100 bg-white bg-opacity-5 hover:bg-cyan hover:bg-opacity-5 last:border-b-0"
                    >
                      <td className="py-4 flex items-center uppercase">
                        <SaveBtn data={url} />
                        <img
                          className="w-[1.5rem] h-[1.5rem] mx-1.5"
                          src={url.image}
                          alt={url.name}
                        />
                        <span>
                          <Link to={`/${url.id}`} className=" cursor-pointer">
                            {url.symbol}
                          </Link>
                        </span>
                      </td>
                      <td className="py-4">
                        <Link to={`/${url.id}`} className=" cursor-pointer">
                          {url.name}
                        </Link>
                      </td>
                      <td className="py-4">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: curr,
                        }).format(url.current_price)}
                      </td>
                      <td className="py-4">{url.total_volume}</td>
                      <td className="py-4">
                        {Number(url.market_cap_change_percentage_24h).toFixed(
                          3
                        )}{" "}
                        %
                      </td>
                      <td
                        className={
                          url.price_change_percentage_1h_in_currency > 0
                            ? "text-green py-4"
                            : "text-red py-4"
                        }
                      >
                        {Number(
                          url.price_change_percentage_1h_in_currency
                        ).toFixed(3)}
                      </td>
                      <td
                        className={
                          url.price_change_percentage_24h_in_currency > 0
                            ? "text-green py-4"
                            : "text-red py-4"
                        }
                      >
                        {Number(
                          url.price_change_percentage_24h_in_currency
                        ).toFixed(3)}
                      </td>
                      <td
                        className={
                          url.price_change_percentage_7d_in_currency > 0
                            ? "text-green py-4"
                            : "text-red py-4"
                        }
                      >
                        {Number(
                          url.price_change_percentage_7d_in_currency
                        ).toFixed(3)}
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          ) : (
            <h1 className="min-h-[60vh] text-lg text-cyan flex items-center justify-center">
              There is no data to display!
            </h1>
          )}

          <motion.button
            className="w-[2rem] flex justify-center items-center ml-4 p-1 absolute right-2 -top-5 rounded-full text-white transition-transform duration-300 ease-out"
            onClick={handleClickForSaved}
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

export default Saved;
