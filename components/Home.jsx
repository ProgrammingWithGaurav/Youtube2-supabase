import React from "react";
import { useStateContext } from "../context/StateContext";
import CategoriesBar from "./CategoriesBar";
import Sidebar from "./Sidebar";

const Home = () => {
  const { user, Categories, activeCategory, setActiveCategory} = useStateContext();
  return <div className="flex-1 flex items-center">
    {user && <Sidebar />}
    <div className="flex-1 ml-2 h-full flex flex-col">
      <CategoriesBar categories={Categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
    </div>
  </div>;
};

export default Home;
