import React from "react";
import TableComponent from "../Components/TableComponent";
import Filter from "../Components/Filter";
import { Outlet } from "react-router-dom";

const Crypto = () => {

  const glowStyle = {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.7)",
  };

  return (
    <section className="w-[90%] h-full flex flex-col mt-16 mb-24 relative" >
      <Filter />
      <TableComponent  />

      <Outlet />
    </section>
  );
};

export default Crypto;
