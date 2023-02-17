import { TrashIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import TimeAgo from "javascript-time-ago";
import { useRouter } from "next/router";
import { numify } from "numify";
import React from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";

const Video = ({
  index,
  thumbnail,
  uid,
  title,
  channelRef,
  views,
  timestamp,
}) => {
  const router = useRouter();
  const { fetchChannelDetails } = useChannelState();
  const { VideoOptions, videoOption, setVideoOption } = useStateContext();
  const newOptions = () => [
    ...VideoOptions,
    {
      name: "Remove from Liked Videos",
      icon: <TrashIcon className="icon" />,
      onClick: () => {
        console.log("removed from liked video");
      },
    },
  ];
  const timeAgo = new TimeAgo("en-US");

  const { channelDisplayName, channelName } = fetchChannelDetails(channelRef);

  return (
    <div className="flex gap-2 p-2 px-4 cursor-pointer h-30 hover:bg-gray-50 rounded-2xl dark:transparent dark:hover:bg-white/10">
      <span className="my-10 text-lg font-semibold text-gray-700 dark:text-gray-400">
        {index}
      </span>
      <div className="w-48 gap-2 p-2">
        <img
          onClick={() => router.push(`/watch/${uid}`)}
          src={thumbnail}
          alt="thumbnail image"
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col my-2 mt-2 space-y-2">
        <p className="leading-4 text-bold">{title}</p>
        <p className="flex items-center gap-1 text-gray-400 dark:text-gray-300">
          <span
            className="cursor-pointer hover:text-gray-200"
            onClick={() => router.push(`/${channelName}`)}
          >
            {channelDisplayName} •
          </span>{" "}
          <span>{numify(views)} </span>
          <span> • {timeAgo.format(timestamp)}</span>
        </p>
      </div>

      
      <EllipsisVerticalIcon
            onClick={() =>
              videoOption === uid ? setVideoOption("") : setVideoOption(uid)
            }
            className="w-8 h-8 p-1 mt-4 text-gray-600 rounded-lg opacity-0 clickable-icon dark:text-white group-hover:opacity-100"
          />
          {videoOption === uid && (
          <div className="bg-white shadow p-2 rounded-xl dark:bg-neutral-900 w-[300px] h-auto top-16 right-6 z-[1000000000] absolute">
            {newOptions.map((option) => (
              <div
                onClick={() => {
                  setVideoOption("");
                  option.onClick(uid, title, thumbnail);
                }}
                className={`flex rounded-xl dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200`}
                key={option.name}
              >
                <span>{option.icon}</span>
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

const LikedVideos = () => {
  const { likedVideos } = useChannelState();
  console.log(likedVideos.map((like, index) => console.log(index)));

  return (
    <div className="flex flex-col flex-1 my-20">
      {likedVideos?.map((video, index) => (
        <Video index={index} key={index} {...video} />
      ))}
    </div>
  );
};

export default LikedVideos;
