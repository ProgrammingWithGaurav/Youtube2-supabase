import React from "react";
import { useStateContext } from "../context/StateContext";
import CategoriesBar from "./CategoriesBar";
import Sidebar from "./Sidebar";
import Masonry from "react-masonry-css";
import Video from "./Video";

const Home = () => {
  const { user, Categories, activeCategory, videos, setActiveCategory } =
    useStateContext();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="flex-1 flex items-center">
      {user && <Sidebar />}
      <div className="flex-1 ml-2 h-full flex flex-col">
        <CategoriesBar
          categories={Categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4 flex-wrap"
          columnClassName="my-masonry-grid_column"
        >
          {videos.map((video) => (
           <Video key={video.channelName} {...video}/>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Home;
