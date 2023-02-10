import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useChannelState } from "../../context/ChannelState";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../../context/StateContext";

const CommentInput = () => {
  const [comment, setComment] = useState("");
  const { currentChannel } = useChannelState();
  const { appearance } = useStateContext();
  const { channelImage } = currentChannel;

  const [emojiPicker, setEmojiPicker] = useState(false);

  return (
    <div className="flex my-2 p-2 w-full items-center">
      <img
        src={channelImage}
        alt="channel Image"
        className="clickable-icon w-16 h-16"
      />
      <div className="flex-col flex w-full">
        <div className='flex items-center'>
        <input
          className="input flex-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setEmojiPicker(false)}
          placeholder='Add a commment...'
        />
        <FaceSmileIcon
          className="clickable-icon"
          onClick={() => setEmojiPicker(!emojiPicker)}
        />
        </div>
        <div className='flex items-center w-full gap-2 mt-4'>
        
            <button className='rounded-full px-4 py-2 hover:bg-gray-200 active:bg-gray-100 transition dark:bg-white/10 dark:active:bg-white/10 dark:hover:bg-white/20 bg-gray-100' onClick={() => setComment('')}>Cancle</button>
            <button className={`rounded-full px-4 py-2 transition ${comment.trim().length > 0 ? 'text-blue-50 bg-blue-400  dark:text-white active:bg-blue-400 hover:bg-blue-500' : 'bg-gray-300 text-gray-500'}`} onClick={() => setComment('')}>Comment</button>
        </div>
        {emojiPicker && (
          <EmojiPicker
            theme={appearance === "dark" ? "dark" : "light"}
            onEmojiClick={(e) => setComment(comment.concat(e.emoji))}
          />
        )}
      </div>
    </div>
  );
};

export default CommentInput;
