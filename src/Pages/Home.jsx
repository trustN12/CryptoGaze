import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../Components/Logo";
import Navigation from "../Components/Navigation";
import { CryptoProvider } from "../Context/CryptoContext";
import Footer from "../Components/Footer";
import { TrendingProvider } from "../Context/TrendingContext";
import Clock from "../Components/Clock";
import { StorageProvider } from "../Context/StorageContext";

const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
        <main className="w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-mono">
          <div className="w-screen h-screen bg-gray-300 fixed -z-10 " />

          <Logo />
          <Clock />
          <Navigation />

          <Outlet />
        </main>

        <Footer />
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
