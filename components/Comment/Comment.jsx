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

const Comment = ({
  channelImage,
  channelDisplayName,
  timestamp,
  comment,
  likes,
  channelName,
  gotHeart,
  replies,
  channelCommented,
  uid,
}) => {
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();
  const { Like, Dislike, setCommentOption, commentOption } = useChannelState();
  const [like, setLike] = useState({ like: true, dislike: false });
  const [showReply, setShowReply] = useState(true);
  const [loading, setLoading] = useState(false);
  const [replyInput, setReplyInput] = useState(false);

  return (
    <div
      className="flex flex-col dark:text-white"
      onClick={() => commentOption && setCommentOption("")}
    >
      <div className="flex items-center relative w-full">
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
              hoverText={`🤍 by ${channelCommented}`}
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
          <ReplyInput setLoading={setLoading} setReplyInput={setReplyInput} />
        )}

        <div className="flex flex-col px-16 my-4 ">
          <span
            className="flex items-center text-sm gap-2 w-20 px-4 py-2 text-blue-500 cursor-pointer hover:bg-blue-500/20 rounded-full"
            onClick={() => {
              if (showReply) {
                setShowReply(false);
              } else {
                setShowReply(true);
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 800);
              }
            }}
          >
            {showReply ? (
              <ChevronUpIcon className="w-4 h-4 text-blue-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-blue-500" />
            )}
            {replies.length > 1 ? "replies" : "reply"}
          </span>
          {loading && <PacmanLoader className="my-4 mx-auto" size={10} />}
          {showReply && <div className="flex"></div>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
