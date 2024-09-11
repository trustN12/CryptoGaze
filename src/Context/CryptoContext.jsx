import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [data, setData] = useState();
  const [SearchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [curr, setCurr] = useState("usd");
  const [filter, setFilter] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPagesContext, setTotalPagesContext] = useState(200);
  const [isSpinning, setIsSpinning] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const getData = async () => {
    try {
      const url = await fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.json())
        .then((json) => json);

      // console.log(url);
      setTotalPagesContext(url.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const url = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr}&ids=${coinSearch}&order=${filter}&per_page=${perPage}&page=${page}&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(url);
      setData(url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCoinDetails = async (coinid) => {
    try {
      const Coin_url = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(Coin_url);
      setCoinData(Coin_url);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSearchResult = async (store) => {
    try {
      const SearchURL = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${store}`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(SearchURL.coins);
      setSearchData(SearchURL.coins);
    } catch (error) {
      setSearchData("Error fetching data:", error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  const handleClick = () => {
    setIsSpinning(true);
    resetFunction();
    setPerPage(10);

    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  useLayoutEffect(() => {
    getData();
  }, [coinSearch, curr, filter, page, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        data,
        SearchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        curr,
        setCurr,
        filter,
        setFilter,
        page,
        setPage,
        totalPagesContext,
        handleClick,
        isSpinning,
        setPerPage,
        perPage,
        getCoinDetails,
        coinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
