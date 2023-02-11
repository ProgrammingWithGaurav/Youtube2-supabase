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
import {
  HandThumbUpIcon as ActiveHandThumbUpIcon,
  HandThumbDownIcon as ActiveHandThumbDownIcon,
} from "@heroicons/react/24/solid";
import TimeAgo from "javascript-time-ago";
import CommentInput from "../Comment/CommentInput";
import Comment from "../Comment/Comment";

const VideoScreen = () => {
  const {
    activeVideo: {
      url,
      views,
      title,
      channelImage,
      channelDisplayName,
      subscribers,
      timestamp,
      type,
      description,
      comments,
    },
  } = useStateContext();
  const { Subscribe, UnSubscribe, Like, Dislike } = useChannelState();
  const [like, setLike] = useState({ like: true, dislike: false });
  const [subscribed, setSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const timeAgo = new TimeAgo("en-US");

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
            <span
              onClick={() => Like(like, setLike, 'video')}
              className="video-control rounded-full rounded-r-none text-sm cursor-pointer pr-2 flex items-center"
            >
              {like?.like ? (
                <ActiveHandThumbUpIcon className="icon" />
              ) : (
                <HandThumbUpIcon className="icon" />
              )}
              1.1k
            </span>
            <div className="w-[1px] video- h-8 py-2 bg-gray-300 dark:bg-white"></div>
            {like.dislike ? (
              <ActiveHandThumbDownIcon
                className="icon rounded-l-none video-control"
                onClick={() => Dislike(like, setLike, 'video')}
              />
            ) : (
              <HandThumbDownIcon
                className="icon rounded-l-none video-control"
                onClick={() => Dislike(like, setLike, 'video')}
              />
            )}
          </div>
          <ShareIcon className="clickable-icon video-control" />
          <CurrencyDollarIcon className="clickable-icon video-control" />
          <EllipsisHorizontalIcon className="clickable-icon video-control" />
        </div>
      </div>

      <div
        onClick={() => showDescription === false && setShowDescription(true)}
        className="w-full p-4 video-control rounded-xl cursor-pointer my-2 flex flex-col"
      >
        <p className="font-semibold text-sm my-1">
          <span>
            {numify(views)} {views > 1 ? "views" : "view"}{" "}
          </span>
          <span>{timeAgo.format(timestamp)} </span>
          <span className="text-blue-500 dark:text-blue-400">#{type}</span>
        </p>

        <p className="my-2">
          {description.length > 100 && !showDescription ? (
            <span>{description.slice(0, 100)}...</span>
          ) : (
            <span>{description}</span>
          )}
          <br />
          <span className="mt-4 text-blue-500 dark:text-blue-400">#{type}</span>
          <br />
          <span
            className="my-4 font-semibold"
            onClick={() => {
              setShowDescription(!showDescription);
              console.log(showDescription);
            }}
          >
            Show {showDescription ? "less" : "more"}
          </span>
        </p>
      </div>

      <div className="py-4 ">
        <p className="text-lg">Comments</p>
        <CommentInput />
        {comments?.map((comment) => (
          <Comment channelCommented={channelDisplayName} key={comment?.timestamp} {...comment} />
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default VideoScreen;
