import { createContext, useLayoutEffect, useState } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();
  const [isSpinning, setIsSpinning] = useState(false);

  const getTrendData = async () => {
    try {
      const trend_url = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(trend_url);
      setTrendData(trend_url.coins);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClickForRefresh = async () => {
    setIsSpinning(true); // Start spinner
    try {
      await getTrendData(); // Fetch new trend data
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false); // Stop spinner after fetching data
      }, 1000);
    }
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
        trendData,
        isSpinning,
        handleClickForRefresh,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
