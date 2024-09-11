import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { CryptoContext } from "./CryptoContext";

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  const [allcoins, setAllcoins] = useState([]);
  const [SavedData, setSavedData] = useState();
  const [isSpinning, setIsSpinning] = useState(false);

  const {curr, filter} = useContext(CryptoContext);

   const saveCoins = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    if(oldCoins.includes(coinId)){
      return null;
    }else{
      let newCoin =[...oldCoins, coinId];
      setAllcoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
   }


   const removeCoins = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));  
    
    let newCoin = oldCoins.filter(coin => coin !== coinId);

    setAllcoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
   }

   const getSavedData = async (totalCoins = allcoins) => {
    if (!totalCoins || totalCoins.length === 0) {
      console.error("No coins available to fetch data for.");
      return;
    }
  
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr}&ids=${totalCoins.join(",")}&order=${filter}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
      setSavedData(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  



  const handleClickForSaved = async () => {
    setIsSpinning(true); // Start spinner
    try {
       getSavedData(); // Fetch new trend data
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false); // Stop spinner after fetching data
      }, 1000);
    }
  };

 

  useLayoutEffect(() => {
      
   let isThere = JSON.parse(localStorage.getItem("coins")) || false;

   if(!isThere){
          localStorage.setItem("coins", JSON.stringify([]));
   }else{
          let totalCoins = JSON.parse(localStorage.getItem("coins"))
          setAllcoins(totalCoins);

          if(totalCoins.length > 0){
            getSavedData(totalCoins);
          }
   }

  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoins, allcoins, removeCoins, SavedData, isSpinning, handleClickForSaved
        
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
