import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useStateContext } from "../../context/StateContext";
import Video from "../Video";

const ChannelVideos = () => {
  const { videos, setVideos, activeChannel : {channelName} } = useStateContext();
  const [videoFilter, setVideoFilter] = useState("Recently Uploaded");
  const videoFilters = [
    {
      name: "Recently Uploaded",
      onClick: () => handleRecentlyPosted()
    },
    {
      name: "Popular",
      onClick: () => handlePopularVideos()
    },
  ];

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [channelVideos, setChannelVideos] = useState([]);

  const handlePopularVideos = () => {
    const channelVideos = videos.filter((video) => video?.channelName === channelName)
    setChannelVideos(channelVideos.sort((video1, video2) => parseFloat(video2.views) - parseFloat(video1.views)));
  }

  const handleRecentlyPosted = () => {
    const channelVideos = videos.filter((video) => video?.channelName === channelName)
    setChannelVideos(channelVideos.sort((video1, video2) => parseFloat(video2.timestamp) - parseFloat(video1.timestamp)));
  }

  useEffect(() => {
    setChannelVideos(
      videos.filter((video) => video?.channelName === channelName)
    );
  }, [videos]);

  return (
    <div className="w-full flex items-start flex-col p-4 mt-4 dark:text-white h-screen">
      <div className="flex items-center mb-4 scrollbar w-[65vw] lg:w-[85vw] gap-2">
        {videoFilters.map((filter) => (
          <span
            onClick={() => {
              setVideoFilter(filter.name);
              filter.onClick();
            }}
            className={`dark:bg-neutral-800 dark:text-white p-2 rounded-xl text-xs cursor-pointer bg-gray-100 transition ${
              videoFilter === filter.name
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-700"
                : "dark:hover:bg-neutral-700 hover:bg-gray-200"
            }`}
          >
            {filter.name}
          </span>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4 flex-wrap items-center justify-start my-4"
        columnClassName="my-masonry-grid_column"
      >
        {channelVideos?.map((video) => (
          <Video key={video.channelName} {...video} />
        ))}
      </Masonry>
    </div>
  );
};

export default ChannelVideos;
