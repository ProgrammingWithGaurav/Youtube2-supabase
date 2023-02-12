import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import CategoriesBar from "./CategoriesBar";
import Masonry from "react-masonry-css";
import Video from "./Video";

const Home = () => {
  const {
    Categories,
    activeCategory,
    videos,
    searchString,
    setVideos,
    setActiveCategory,
    setLoading,
    setLoadingProgress,
  } = useStateContext();
  const [newVideos, setNewVideos] = useState(videos);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // useEffect(() => {
  //   if(searchString === '') return;
  //   setLoadingProgress(70);
  //   setLoading(true);
  //   setTimeout(() => {
  //     const newVideos = videos?.filter((video) =>
  //       video?.title?.toLowerCase().includes(searchString.toLowerCase())
  //     );
  //     setLoadingProgress(90);
  //     setNewVideos(newVideos);
  //     setLoading(false);
  //     setLoadingProgress(100);
  //   }, [1000]);
  // }, [searchString]);

  // useEffect(() => {
  //   if(activeCategory === 'All') setVideos(videos); 
  //   setLoadingProgress(70);
  //   setLoading(true);
  //   setTimeout(() => {
  //     const newVideos = videos?.filter((video) =>
  //       video?.type?.includes(activeCategory.toLowerCase())
  //     );
  //     setLoadingProgress(90);
  //     setNewVideos(newVideos);
  //     setLoading(false);
  //     setLoadingProgress(100);
  //   }, [1000]);
  // }, [activeCategory])

  // useEffect(() => {setNewVideos(videos)}, [])

  return (
    <div className="flex-1">
      <div className="flex-1 pl-20 h-full flex flex-col mt-20">
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
          {newVideos?.map((video) => (
            <Video key={video.uid} {...video} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Home;
