import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/StateContext";
import { useChannelState } from "../../context/ChannelState";
import { numify } from "numify";
import TimeAgo from "javascript-time-ago";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../SupabaseClient";
import { useRouter } from "next/router";

const Video = ({ channelRef, thumbnail, title, timestamp, views, uid , url}) => {
  const { fetchChannelDetails } = useChannelState();
  const { videoOption, setVideoOption, VideoOptions } = useStateContext();
  const [channelDetails, setChannelDetails] = useState();
  const router = useRouter();
  
  useEffect(() => {
    fetchChannelDetails(channelRef).then(data => setChannelDetails(data));
  }, [])
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="flex items-center gap-2 relative pr-8 py-2 my-2 group cursor-pointer">
      <img
        src={thumbnail}
        alt="video thumbnail image"
        className="rounded-xl w-40 h-24"
        onClick={() => {
          router.push(`/watch/${uid}`);
          window.location.reload();
        }}
      />
      <div className="flex flex-col">
        <p className="text-bold text-sm">{title}</p>
        <p className="text-gray text-xs">{channelDetails?.channelDisplayName}</p>
        <p className="text-gray text-xs">
          {numify(views.length)} {numify(views.length)  <= 1 ? 'view' : 'views'} • {timeAgo.format(new Date(timestamp))}
        </p>
      </div>
      <EllipsisVerticalIcon
        onClick={() =>
          videoOption === uid ? setVideoOption("") : setVideoOption(uid)
        }
        className="clickable-icon hidden group-hover:block absolute bg-transparent right-0 top-0"
      />
      {videoOption === uid && (
        <div className="bg-white shadow p-1 rounded-xl dark:bg-neutral-900 w-[300px] h-auto absolute right-10 top-10">
          {VideoOptions.map((option) => (
            <div
              onClick={() => {
                option.onClick();
                setVideoOption("");
              }}
              className={`flex rounded-xl dark:hover:bg-white/20 items-center cursor-pointer transition my-1 hover:bg-gray-100 active:bg-gray-200`}
              key={option.name}
            >
              <span className="1/3">{option.icon}</span>
              <span className={`text-sm text-gray-900 dark:text-white`}>
                {option.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SuggestedVideos = () => {
  const { videos, activeVideo } = useStateContext();
  const { type: cataegory, uid } = activeVideo;
  const [filteredVideos, setFilteredVideos] = useState();

  useEffect(() => {
    const myFunction = async () => {
      const {data} = await supabase.from('videos').select().eq('type', cataegory);
      setFilteredVideos(data.filter(video => video.uid !== uid));
    };

    myFunction();
  }, [])
  return (
    <div className="lg:w-full w-0 p-2 py-4 flex flex-col">
      <span
        className={`p-2 rounded-xl text-xs cursor-pointer bg-neutral-900 transition 
               dark:bg-white text-white font-semibold dark:text-neutral-700  text-center mx-auto w-6/12
          `}
      >
        {cataegory[0].toUpperCase().concat(cataegory.slice(1, 100000))}
      </span>
      {filteredVideos?.map((video) => (
        <Video key={video.uid} {...video} />
      ))}
    </div>
  );
};

export default SuggestedVideos;
