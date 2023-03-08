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
import React, { useEffect, useState } from "react";
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
import Reply from "./Reply";
import { supabase } from "../../SupabaseClient";

const Comment = ({
  timestamp,
  comment,
  likes,
  gotHeart,
  channelCommented,
  channelRef,
  uid,
}) => {
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();
  const {
    Like,
    Dislike,
    setCommentOption,
    commentOption,
    fetchChannelDetails,
    currentChannel
  } = useChannelState();
  const [like, setLike] = useState({ like: true, dislike: false });
  const [channelDetails, setChannelDetails] = useState();
  const [updatedLikes, setUpdatedLikes] = useState(likes?.length);
  const [showReply, setShowReply] = useState(false);
  const [Replies, setReplies] = useState([]);
  

  useEffect(() => {
    const myFunction = async () => {
      const { data: replies } = await supabase
        .from("replies")
        .select()
        .eq("commentRef", uid);
      setReplies(replies);
    };
    myFunction();
  }, []);

  useEffect(() => {
    fetchChannelDetails(channelRef).then((data) => setChannelDetails(data));

    const hasLikedOrDisliked = async () => {
      const { data } = await supabase.from("comments").select().eq("uid", uid);
      const hasLiked = data[0]?.likes?.includes(currentChannel?.uid);
      const hasDisliked = data[0]?.dislikes?.includes(currentChannel?.uid);
      setLike({
        like: hasLiked,
        dislike: hasDisliked,
      });
    };
    hasLikedOrDisliked();
  }, []);
  const [loading, setLoading] = useState(false);
  const [replyInput, setReplyInput] = useState(false);


  const removeComment = () => {};


  return (
    <div
      className="flex flex-col dark:text-white"
      onClick={() => commentOption && setCommentOption("")}
    >
      <div className="flex items-center relative w-full">
        <img
          onClick={() => router.push(`/${channelDetails?.channelName}`)}
          src={channelDetails?.channelImage || process.env.NEXT_PUBLIC_NO_IMAGE_URL}
          alt="user image"
          className="clickable-icon w-16 h-16"
        />

        <div className="flex flex-col">
          <p className="flex items-center gap-2">
            <span
              className="text-bold cursor-pointer"
              onClick={() => router.push(`/${channelDetails?.channelName}`)}
            >
              {channelDetails?.channelDisplayName}
            </span>
            <span className="text-gray">
              {timeAgo?.format(new Date(timestamp))}
            </span>
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
            <span
              onClick={() => removeComment()}
              className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl px-2"
            >
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
                onClick={() =>
                  Like(like, setLike, "comment", uid, setUpdatedLikes)
                }
              />
            ) : (
              <HandThumbUpIcon
                className="clickable-icon"
                onClick={() =>
                  Like(like, setLike, "comment", uid, setUpdatedLikes)
                }
              />
            )}
            <span className="text-xs">{numify(updatedLikes)}</span>
          </span>
          {like.dislike ? (
            <ActiveHandThumbDownIcon
              className="clickable-icon "
              onClick={() =>
                Dislike(like, setLike, "comment", uid, setUpdatedLikes)
              }
            />
          ) : (
            <HandThumbDownIcon
              className="clickable-icon"
              onClick={() =>
                Dislike(like, setLike, "comment", uid, setUpdatedLikes)
              }
            />
          )}
          {gotHeart && (
            <Tooltip
              element={
                <span className="relative ml-8 cursor-pointer">
                  <img
                    src={channelDetails?.channelImage || process.env.NEXT_PUBLIC_NO_IMAGE_URL} 
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
          <ReplyInput
            setReplies={setReplies}
            commentRef={uid}
            setLoading={setLoading}
            setReplyInput={setReplyInput}
          />
        )}

        <div className="flex flex-col px-16 my-4 ">
          {Replies.length > 0 && (
            <span
              className="flex items-center text-sm gap-2 w-28 px-4 py-2 text-blue-500 cursor-pointer hover:bg-blue-500/20 rounded-full"
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
              <span>{Replies.length}</span>
              <span>{Replies.length > 1 ? "replies" : "reply"}</span>
            </span>
          )}
          {loading && <PacmanLoader className="my-4 mx-auto" size={10} />}
          {showReply && !loading && Replies.length > 0 && (
            <div className="flex flex-col space-y-2">
              {Replies?.map((reply) => (
                <Reply
                  channelReplied={channelCommented}
                  {...reply}
                  key={reply?.uid}
                  commentRef={uid}
                  setRepiles={setReplies}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
