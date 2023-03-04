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
import { useEffect, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import {
  HandThumbUpIcon as ActiveHandThumbUpIcon,
  HandThumbDownIcon as ActiveHandThumbDownIcon,
} from "@heroicons/react/24/solid";
import TimeAgo from "javascript-time-ago";
import CommentInput from "../Comment/CommentInput";
import Comment from "../Comment/Comment";
import { useRouter } from "next/router";
import { supabase } from "../../SupabaseClient";

const VideoScreen = () => {
  const {
    activeVideo: {
      url,
      thumbnail,
      likes,
      views,
      title,
      type,
      description,
      comments,
      channelRef,
      timestamp,
      uid,
    },
    activeVideo,
    videoOption,
    VideoOptions,
    setVideoOption,
    setShareDialog,
  } = useStateContext();

  const {
    Subscribe,
    UnSubscribe,
    Like,
    Dislike,
    fetchChannelDetails,
    currentChannel,
  } = useChannelState();

  const [like, setLike] = useState({ like: true, dislike: false });
  const [channelDetails, setChannelDetails] = useState();
  const [subscribers, setSubscribers] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  fetchChannelDetails(channelRef).then((data) => {
    setChannelDetails(data);
  });
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const myFunction = async () => {
      const { data } = await supabase
        .from("channelInfo")
        .select()
        .eq("channelRef", channelRef);
      setSubscribers(data[0]?.subscribers);
    };
    myFunction();
  }, []);

  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();

  return (
    <div className="w-screen flex flex-col p-2">
      <video
        className="lg:h-[75vh] sm:h-[550px] min-w-full object-cover rounded-xl"
        controls
        autoPlay
      >
        <source src={url} type="video/mp4" />
      </video>
      <p className="text-xl my-1 font-bold leading-6">{title}</p>

      <div className="flex items-center justify-between my-2 relative">
        <div className="flex gap-2 items-center">
          <img
            src={channelDetails?.channelImage}
            alt="channel picture"
            onClick={() => router.push(`/@${channelDetails?.channelName}`)}
            className="clickable-icon w-10 h-10 p-0"
          />
          <div className="flex flex-col">
            <span
              className="font-semibold dark:text-white text-sm cursor-pointer"
              onClick={() => router.push(`/@${channelDetails?.channelName}`)}
            >
              {channelDetails?.channelDisplayName}
            </span>
            <span className="dark:text-gray-400 text-xs">
              {numify(subscribers)}{" "}
              {subscribers <= 1 ? "Subscriber" : "Subscribers"}
            </span>
          </div>

          {currentChannel?.uid !== channelRef &&
            (subscribed ? (
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
            ))}
        </div>

        <div className="flex gap-2 items-center">
          <div className="dark:bg-white/10 bg-gray-100 transition-none flex items-center rounded-full">
            <span
              onClick={() => Like(like, setLike, "video")}
              className="video-control rounded-full rounded-r-none text-sm cursor-pointer pr-2 flex items-center"
            >
              {like?.like ? (
                <ActiveHandThumbUpIcon className="icon" />
              ) : (
                <HandThumbUpIcon className="icon" />
              )}
              {numify(likes?.length)}
            </span>
            <div className="w-[1px] video- h-8 py-2 bg-gray-300 dark:bg-white"></div>
            {like.dislike ? (
              <ActiveHandThumbDownIcon
                className="icon rounded-l-none video-control"
                onClick={() => Dislike(like, setLike, "video")}
              />
            ) : (
              <HandThumbDownIcon
                className="icon rounded-l-none video-control"
                onClick={() => Dislike(like, setLike, "video")}
              />
            )}
          </div>
          <ShareIcon
            className="clickable-icon video-control"
            onClick={() =>
              setShareDialog({
                videoUrl: `${process.env.NEXT_PUBLIC_URL}/watch/${uid}`,
                open: true,
                title,
                thumbnail,
              })
            }
          />
          <CurrencyDollarIcon className="clickable-icon video-control" />
          <EllipsisHorizontalIcon
            onClick={() =>
              videoOption === uid ? setVideoOption("") : setVideoOption(uid)
            }
            className="clickable-icon video-control"
          />
        </div>
        {videoOption === uid && (
          <div className="bg-white shadow p-2 rounded-xl dark:bg-neutral-900 w-[300px] h-auto absolute right-10 top-10">
            {VideoOptions.map((option) => (
              <div
                onClick={() => {
                  option.onClick();
                  setVideoOption("");
                }}
                className={`flex rounded-xl dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200`}
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

      <div
        onClick={() => showDescription === false && setShowDescription(true)}
        className="lg:w-full p-4 video-control h-auto rounded-xl cursor-pointer my-2 flex flex-col"
      >
        <p className="font-semibold text-sm my-1">
          <span>
            {numify(views)} {views > 1 ? "views" : "view"}{" "}
          </span>
          <span>{timeAgo?.format(new Date(timestamp))} </span>
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
            }}
          >
            Show {showDescription ? "less" : "more"}
          </span>
        </p>
      </div>

      <div className="py-4 my-4 ">
        <p className="text-lg">Comments</p>
        <CommentInput />
        {comments?.map((comment) => (
          <Comment
            channelCommented={channelDetails?.channelDisplayName}
            key={comment?.timestamp}
            {...comment}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoScreen;
