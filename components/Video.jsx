import TimeAgo from "javascript-time-ago";
import { useRouter } from "next/router";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import ytDuration from "youtube-duration";
import { useStateContext } from "../context/StateContext";
import { useEffect, useState } from "react";
import { numify } from "numify";
import { useChannelState } from "../context/ChannelState";

export default function Video({
  duration,
  thumbnail,
  timestamp,
  title,
  views,
  uid,
  channelRef,
}) {
  const { VideoOptions, videoOption, setVideoOption } = useStateContext();
  const [channelDetails, setChannelDetails] = useState();
  const { fetchChannelDetails } = useChannelState();
  const [newThumbnail, setNewThumbnail] = useState(thumbnail);
  const router = useRouter();

  useEffect(() => {
    fetchChannelDetails(channelRef).then((data) => {
      setChannelDetails(data);
    });
  }, []);
  
  useEffect(() => {
    if(thumbnail != ""){
      const myFunction = async (url, callback) =>  {
        var video = document.createElement('video');
        video.addEventListener('loadeddata', function() {
          var canvas = document.createElement('canvas');
          canvas.width = this.videoWidth;
          canvas.height = this.videoHeight;
          canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
          var dataURL = canvas.toDataURL();
          callback(dataURL);
          URL.revokeObjectURL(this.src);
        });
        video.src = url;
        video.setAttribute('crossorigin', 'anonymous');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('loop', 'true');
        video.setAttribute('muted', 'true');
      }

      
      getVideoThumbnail('https://example.com/video.mp4', async function(dataURL) {
        await supabase.storage
        .from("thumbnails")
        .upload('hi.png', dataURL, {
          cacheControl: "3600",
          upsert: false,
        });
  // thumbnail
  
});
      }
  }, [thumbnail])
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className=" cursor-pointer w-full h-64 my-2 hover:scale-105 transition group">
      <div className="relative">
        <img
          src={newThumbnail}
          onClick={() => router.push(`/watch/${uid}`)}
          className="rounded-xl object-cover"
          alt="video thumbnail"
        />
        <span className="absolute text-white bg-neutral-900/80 bottom-2 right-2 rounded-lg px-2 py-1 text-xs font-semibold">
          {ytDuration.format(`PT0M${duration}S`)}
        </span>
      </div>
      <div className="p-1 -mt-2 px-0">
        <div className="text-gray-900 dark:text-white font-bold truncate flex">
          <img
            onClick={() => router.push(`/${channelDetails?.channelName}`)}
            src={channelDetails?.channelImage}
            alt="Channel Profile Picture"
            className="w-10 h-10 rounded-full mt-4"
          />
          <div className="w-full mt-1 p-2 text-ellipsis overflow-hidden">
            <span className="w-full ">
              {title.length > 27 ? title.slice(0, 27) : title}
            </span>
            <br />
            <span className="w-full ">
              {title.length > 27 && `${title.slice(27, 1000)}`}
            </span>
            <br />
            <p
              className="flex items-center gap-1 text-gray-600 w-full dark:text-gray-400 text-sm font-normal hover:text-gray-800 dark:hover:text-gray-300 transition"
              onClick={() => router.push(`/${channelDetails?.channelName}`)}
            >
              {channelDetails?.channelDisplayName}{" "}
              <CheckCircleIcon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            </p>
            <span
              className="dark:text-gray-400 text-sm font-normal"
              onClick={() => router.push(`/${channelDetails?.channelName}`)}
            >
              {numify(views?.length)} {views?.length > 1 ? "views" : "view"} •{" "}
              {timeAgo.format(new Date(timestamp))}
            </span>
          </div>
          <EllipsisVerticalIcon
            onClick={() =>
              videoOption === uid ? setVideoOption("") : setVideoOption(uid)
            }
            className="clickable-icon w-8 h-8 p-1 dark:text-white text-gray-600 rounded-lg mt-4 opacity-0 group-hover:opacity-100"
          />
        </div>
        {videoOption === uid && (
          <div className="bg-white shadow p-2 rounded-xl dark:bg-neutral-900 w-[300px] h-auto top-16 right-6 z-[1000000000] absolute">
            {VideoOptions.map((option) => (
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
    </div>
  );
}
