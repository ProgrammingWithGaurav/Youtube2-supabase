import {
  BellIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { numify } from "numify";
import { useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";

const VideoScreen = () => {
  const {
    activeVideo: { url, title, channelImage, channelDisplayName, subscribers },
  } = useStateContext();
  const { Subscribe, UnSubscribe } = useChannelState();
  const [hasLiked, setHasLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="lg:w-8/12 w-screen scrollbar overflow-x-hidden h-screen flex flex-col p-2">
      <video
        className="w-full lg:h-[70vh] sm:h-[500px] object-cover rounded-xl"
        controls
      >
        <source
          src={
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
          type="video/mp4"
        />
      </video>
      <p className="text-xl my-1 font-bold leading-6">{title}</p>

      <div className="flex items-center justify-between  my-2">
        <div className="flex gap-2 items-center">
          <img
            src={channelImage}
            alt="channel picture"
            className="clickable-icon w-10 h-10 p-0"
          />
          <div className="flex flex-col">
            <span className="font-semibold dark:text-white text-sm">
              {channelDisplayName}
            </span>
            <span className="dark:text-gray-400 text-xs">
              {numify(subscribers)}{" "}
              {subscribers <= 1 ? "Subscriber" : "Subscribers"}
            </span>
          </div>

          {subscribed ? (
            <div
              onClick={() => UnSubscribe(setSubscribed)}
              className="space-x-2 dark:hover:bg-neutral-700 mr-8 text-neutral-900 dark:text-white dark:bg-neutral-800 flex items-center py-2 px-4 bg-gray-100 text-xs rounded-full cursor-pointer font-semibold hover:bg-gray-200"
            >
              <BellIcon className="icon p-0 w-4 h-4" />
              <span>Unsubscribe</span>
              <ChevronDownIcon className="icon p-0 w-2 h-2" />
            </div>
          ) : (
            <button
              onClick={() => Subscribe(setSubscribed)}
              className="subscribe"
            >
              Subscribe
            </button>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <div className="dark:bg-white/10 bg-gray-100 transition-none flex items-center rounded-full">
            <span className='video-control rounded-full rounded-r-none text-sm cursor-pointer pr-2 flex items-center'>
            <HandThumbUpIcon className="icon" />
              1.1k
            </span>
            <div className="w-[1px] video- h-8 py-2 bg-gray-300 dark:bg-white"></div>
            <HandThumbDownIcon className="icon rounded-l-none video-control" />
          </div>
          <ShareIcon className="clickable-icon video-control" />
          <CurrencyDollarIcon className="clickable-icon video-control" />
          <EllipsisHorizontalIcon className="clickable-icon video-control" />
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;
