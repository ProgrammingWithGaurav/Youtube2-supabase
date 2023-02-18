import React, { useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const LikedVideosDetails = () => {
  const { likedVideos, currentChannel } = useChannelState();
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 p-4 mt-12 sm:tems-center lg:items-start bg-gradient-to-b group filter from-red-200 to-blue-200 dark:from-red-400 dark:to-blue-400 rounded-2xl lg:w-80 lg:flex-col">
      <div className="relative h-40 mx-auto cursor-pointer w-38 ">
        <span className="absolute w-full h-full my-4 mt-16 text-2xl font-semibold text-center text-white">
          Play All
        </span>
        <img
          src={likedVideos[0]?.thumbnail}
          onClick={() => router.push(`/watch/${likedVideos[0]?.uid}`)}
          alt="first liked video "
          className="sm:rounded-md rounded-2xl staurate-50 group-hover:saturate-150 filter "
        />
      </div>
      <p className="text-2xl leading-10 text-bold sm:tex-sm">Liked Videos</p>

      <p className="text-bold">{currentChannel?.channelName}</p>
      <p className="text-xs text-gray-700 cursor-pointer hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {likedVideos?.length} videos • Updated
      </p>

      <div className="flex items-center w-full">
        <button onClick={() => router.push(`/watch/${likedVideos[0]?.uid}`)}  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition bg-white rounded-full dark:text-white hover:opacity-90 w-28 text-neutral-900 dark:bg-neutral-900">
          <PlayIcon className="w-5 h-5 p-0" /> Play All
        </button>
      </div>
    </div>
  );
};

export default LikedVideosDetails;
