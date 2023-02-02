import React from "react";
import { useStateContext } from "../context/StateContext";
import Sidebar from "./Sidebar";

const Home = () => {
  const { user } = useStateContext();
  return <div className="flex-1 flex items-center">
    {user && <Sidebar />}
    <div className="flex-1 h-full"></div>
  </div>;
};

export default Home;
