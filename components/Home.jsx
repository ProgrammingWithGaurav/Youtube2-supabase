import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import CataegoriesBar from "./CataegoriesBar";
import Masonry from "react-masonry-css";
import Video from "./Video";

const Home = () => {
  const {
    Cataegories,
    activeCataegory,
    videos,
    searchString,
    setVideos,
    setActiveCataegory,
    setLoading,
    setLoadingProgress,
  } = useStateContext();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    if (searchString === "") setVideos(videos);
    setLoadingProgress(70);
    setLoading(true);
    setTimeout(() => {
      const newVideos = videos?.filter((video) =>
        video?.title?.toLowerCase().includes(searchString.toLowerCase())
      );
      setLoadingProgress(90);
      setLoading(false);
      setLoadingProgress(100);
    }, [1000]);
  }, [searchString]);

  // useEffect(() => {
  //   if(activeCataegory === 'All') setVideos(videos);
  //   setLoadingProgress(70);
  //   setLoading(true);
  //   setTimeout(() => {
  //     const newVideos = videos?.filter((video) =>
  //       video?.type?.includes(activeCataegory.toLowerCase())
  //     );
  //     setLoadingProgress(90);
  //     setNewVideos(newVideos);
  //     setLoading(false);
  //     setLoadingProgress(100);
  //   }, [1000]);
  // }, [activeCataegory])

  // useEffect(() => {setNewVideos(videos)}, [])

  

  return (
    <div className="flex-1">
      <div className="flex-1 pl-20 h-full flex flex-col mt-20">
        <CataegoriesBar
          cataegories={Cataegories}
          activeCataegory={activeCataegory}
          setActiveCataegory={setActiveCataegory}
        />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4 flex-wrap"
          columnClassName="my-masonry-grid_column"
        >
          {videos?.map((video) => (
            <Video key={video?.uid} {...video} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Home;
