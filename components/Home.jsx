import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import CataegoriesBar from "./CataegoriesBar";
import Masonry from "react-masonry-css";
import Video from "./Video";
import { supabase } from "../SupabaseClient";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const {
    Cataegories,
    activeCataegory,
    searchString,
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
    const myFunction = async () => {
      if (searchString === "") {
        const { data: videos } = await supabase.from("videos").select();
        setVideos(videos);
      } else {
        setLoadingProgress(70);
        setLoading(true);
        setTimeout(async () => {
          const { data: videos } = await supabase.from("videos").select();
          const newVideos = await videos?.filter((video) =>
            video?.title?.toLowerCase().includes(searchString.toLowerCase())
          );
          setVideos(newVideos);
          setLoadingProgress(90);
          setLoading(false);
          setLoadingProgress(100);
        }, [1000]);
      }
    };
    myFunction();
  }, [searchString]);

  useEffect(() => {
    const myFunction = async () => {
      if (activeCataegory === "All") {
        const { data: videos } = await supabase.from("videos").select();
        setVideos(videos);
        console.log('setted videos....')
      }
      setLoadingProgress(70);
      setLoading(true);
      setTimeout(async () => {
        if(activeCataegory === 'All') {
        setLoadingProgress(100);
          return;
        };
        const { data: videos } = await supabase.from("videos").select();
        const newVideos = videos?.filter((video) =>
          video?.type?.toLowerCase().startsWith(activeCataegory.toLowerCase())
        );
        setVideos(newVideos);
        setLoadingProgress(90);
        setLoading(false);
        setLoadingProgress(100);
      }, [1000]);
    };
    myFunction();
  }, [activeCataegory]);

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
