import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useChannelState } from "../../context/ChannelState";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../../context/StateContext";
import { supabase } from "../../SupabaseClient";
import { PacmanLoader } from "react-spinners";

const ReplyInput = ({ setReplyInput, setLoading, input, commentRef , setReplies}) => {
  const [reply, setReply] = useState(input ? input : "");
  const { currentChannel } = useChannelState();
  const { appearance } = useStateContext();
  const { channelImage } = currentChannel;
  
  const [emojiPicker, setEmojiPicker] = useState(false);

  
  const sendReply = async () => {
    setLoading(true);
    const {data, error} = await supabase.from('replies').insert({
      channelRef: currentChannel?.uid,
      timestamp: new Date(),
      reply: reply,
      commentRef: commentRef
    }).select();
    
    try {
    setReplies(replies => [...replies, data[0]])
    } catch {err => console.log(err)}
    setTimeout(() => {
      setReply('');
      setLoading(false);
      setReplyInput(false)
    }, [500])
  };

  return (
    <div className="flex my-2 p-2 ml-10 items-center transform">
      <img
        src={channelImage || process.env.NEXT_PUBLIC_NO_IMAGE_URL}
        alt="channel Image"
        className="clickable-icon w-16 h-16"
      />
      <div className="flex-col flex w-full">
        <div className="flex items-center">
          <input
            className="input flex-1 text-sm"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onFocus={() => setEmojiPicker(false)}
            placeholder="Add a reply..."
          />
          <FaceSmileIcon
            className="clickable-icon w-10 h-10"
            onClick={() => setEmojiPicker(!emojiPicker)}
          />
        </div>
        <div className="flex items-center w-full gap-2 mt-2 text-sm">
          <button
            className="rounded-full px-4 py-1 hover:bg-gray-200 active:bg-gray-100 transition dark:bg-white/10 dark:active:bg-white/10 dark:hover:bg-white/20 bg-gray-100"
            onClick={() => {
              setReply("");
              setReplyInput(false);
            }}
          >
            Cancle
          </button>
          <button
            className={`rounded-full px-4 py-1 transition ${
              reply.trim().length > 0
                ? "text-blue-50 bg-blue-400  dark:text-white active:bg-blue-400 hover:bg-blue-500"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={reply.trim().length === 0}
            onClick={() => sendReply()}
          >
            Reply
          </button>
        </div>
        {emojiPicker && (
          <EmojiPicker
            theme={appearance === "dark" ? "dark" : "light"}
            onEmojiClick={(e) => setReply(reply.concat(e.emoji))}
          />
        )}
      </div>
    </div>
  );
};

export default ReplyInput;
