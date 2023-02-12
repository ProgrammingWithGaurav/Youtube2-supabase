import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import TimeAgo from "javascript-time-ago";
import React, { useState } from "react";
import {
  HandThumbDownIcon as ActiveHandThumbDownIcon,
  HandThumbUpIcon as ActiveHandThumbUpIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { useChannelState } from "../../context/ChannelState";
import { useRouter } from "next/router";
import Tooltip from "../Tooltip";
import { numify } from "numify";
import { PacmanLoader } from "react-spinners";
import ReplyInput from "./ReplyInput";

const Reply = ({
  channelImage,
  channelDisplayName,
  timestamp,
  comment,
  likes,
  channelName,
  gotHeart,
  replies,
  channelReplied,
  uid,
}) => {
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();
  const { Like, Dislike, setCommentOption, commentOption } = useChannelState();
  const [like, setLike] = useState({ like: true, dislike: false });
  const [loading, setLoading] = useState(false);
  const [replyInput, setReplyInput] = useState(false);

  return (
    <div
      className="flex flex-col dark:text-white"
      onClick={() => commentOption && setCommentOption("")}
    >
      <div className="flex items-center relative lg:w-[53vw] w-[90vw] ">
        <img
          onClick={() => router.push(`/${channelName}`)}
          src={channelImage}
          alt="user image"
          className="clickable-icon w-16 h-16"
        />

        <div className="flex flex-col">
          <p className="flex items-center gap-2">
            <span
              className="text-bold cursor-pointer"
              onClick={() => router.push(`/${channelName}`)}
            >
              {channelDisplayName}
            </span>
            <span className="text-gray">{timeAgo.format(timestamp)}</span>
          </p>
          <p className="text-sm flex-1">{comment}</p>
        </div>
        <EllipsisVerticalIcon
          className="clickable-icon absolute right-4"
          onClick={() =>
            commentOption === "" ? setCommentOption(uid) : setCommentOption("")
          }
        />
        {uid === commentOption && (
          <div className="flex flex-col text-xs bg-white dark:bg-neutral-900 shadow-sm p-1 rounded absolute top-4 right-16 z-[10000]">
            <span className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl px-2">
              <FlagIcon className="icon w-8 h-8" /> Report
            </span>
            <span className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl px-2">
              <EyeSlashIcon className="icon w-8 h-8" /> Remove
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="flex items-center px-12">
          <span className="flex items-center">
            {like?.like ? (
              <ActiveHandThumbUpIcon
                className="clickable-icon"
                onClick={() => Like(like, setLike, "comment")}
              />
            ) : (
              <HandThumbUpIcon
                className="clickable-icon"
                onClick={() => Like(like, setLike, "comment")}
              />
            )}
            <span className="text-xs">{numify(likes.length)}</span>
          </span>
          {like.dislike ? (
            <ActiveHandThumbDownIcon
              className="clickable-icon "
              onClick={() => Dislike(like, setLike, "comment")}
            />
          ) : (
            <HandThumbDownIcon
              className="clickable-icon"
              onClick={() => Dislike(like, setLike, "comment")}
            />
          )}
          {gotHeart && (
            <Tooltip
              element={
                <span className="relative ml-8 cursor-pointer">
                  <img
                    src={channelImage}
                    className="w-6 h-6 rounded-full cursor-pointer p-1"
                    alt="channel heart"
                  />
                  <HeartIcon className="text-red-500 w-4 h-4 absolute -bottom-1 -right-1" />
                </span>
              }
              hoverText={`🤍 by ${channelReplied}`}
              width="w-36"
            />
          )}

          <button
            onClick={() => setReplyInput(true)}
            className="text-bold text-xs mx-4 bg-transparent dark:bg-transparent dark:active:bg-white/10 active:bg-gray-100 video-control p-2 px-4 rounded-full"
          >
            Reply
          </button>
        </p>
        {replyInput && (
          <ReplyInput
            input={`@${channelName} `}
            setLoading={setLoading}
            setReplyInput={setReplyInput}
          />
        )}
      </div>
    </div>
  );
};

export default Reply;
