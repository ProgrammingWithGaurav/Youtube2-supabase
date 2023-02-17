import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import Video from "../Video";

const ChannelHome = () => {
  const {
    videos,
    setVideos,
    activeChannel: { channelName, uid },
  } = useStateContext();
  const { channelSearch, setChannelSearch } = useChannelState();
  const [videoFilter, setVideoFilter] = useState("Recently Uploaded");
  const videoFilters = [
    {
      name: "Recently Uploaded",
      onClick: () => handleRecentlyPosted(),
    },
    {
      name: "Popular",
      onClick: () => handlePopularVideos(),
    },
  ];

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [channelVideos, setChannelVideos] = useState([]);
  const {fetchChannelDetails} = useChannelState();

  const handlePopularVideos = () => {
    const channelVideos = videos.filter(
      (video) => video?.channelRef === uid
    );
    setChannelVideos(
      channelVideos.sort(
        (video1, video2) => parseFloat(video2.views) - parseFloat(video1.views)
      )
    );
  };

  const handleRecentlyPosted = () => {
    const channelVideos = videos.filter(
      (video) => video?.channelName === channelName
    );
    channelVideos.length > 1 &&
    setChannelVideos(
      channelVideos.sort(
        (video1, video2) =>
          parseFloat(video2.timestamp) - parseFloat(video1.timestamp)
      )
    );
  };

  const searchChannelVideos = () => {
    if(channelSearch?.trim() === '') return;
    const channelVideos = videos.filter(
      (video) => video?.channelRef === uid
    );
    setChannelVideos(
      channelVideos.filter((video) => video.title.toLowerCase().includes(channelSearch.toLowerCase()))
    );
  };

  const fetchChannelVideos = () => {
    setChannelVideos(
      videos.filter((video) => video?.channelRef === uid)
      );
  }

  useEffect(() => {
    channelSearch.trim() === '' ? fetchChannelVideos() : searchChannelVideos();
  }, [videos, channelSearch]);

  return (
    <div className="w-full flex items-start flex-col p-4 mt-4 dark:text-white h-screen">
      <div className="flex items-center mb-4 scrollbar w-[65vw] lg:w-[85vw] gap-2">
        {videoFilters.map((filter) => (
          <span
            key={filter.name}
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

export default ChannelHome;
