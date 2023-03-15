import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import {supabase} from '../../SupabaseClient';
import Video from "../Video";

const ChannelHome = () => {
  const {
    setVideos,
    activeChannel: { channelName, uid },
  } = useStateContext();
  const { channelSearch, setChannelSearch, fetchChannelVideos } = useChannelState();
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

  const handlePopularVideos =async () => {
    const {data: videos} = await supabase.from('videos').select().eq('channelRef', uid);
    setChannelVideos(
      videos.sort(
        (video1, video2) => parseFloat(video2.views) - parseFloat(video1.views)
      )
    );
    console.log( videos.sort(
      (video1, video2) => parseFloat(video2.views?.length) - parseFloat(video1.views?.length)
    ))
  };

  const handleRecentlyPosted = async () => {
    const {data: channelVideos} = await supabase.from('videos').select().eq('channelRef', uid);
    channelVideos.length > 1 &&
    setChannelVideos(
      channelVideos.sort(
        (video1, video2) =>
          parseFloat(video2.timestamp) - parseFloat(video1.timestamp)
      )
    );
  };

  const searchChannelVideos =  async() => {
    if(channelSearch?.trim() === '') return;
    const myFunction = async () => {
      const channelVideos = await fetchChannelVideos(uid);
await    setChannelVideos(
      channelVideos?.filter((video) => video.title.toLowerCase().includes(channelSearch.toLowerCase()))
    );
    }
    myFunction();
  };

  useEffect(() => {
    console.log(channelSearch, channelSearch?.trim()?.length)
    const fetchVideos = async () => {
      const channelVideos =await fetchChannelVideos(uid);
      console.log(channelVideos)
      await setChannelVideos(channelVideos);
    }
    channelSearch.trim()?.length ===0 ? fetchVideos(): searchChannelVideos();
  }, [channelSearch]);

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
