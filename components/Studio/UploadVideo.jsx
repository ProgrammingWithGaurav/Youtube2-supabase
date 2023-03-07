import {
  ChatBubbleLeftEllipsisIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { uid } from "uid";
import { useChannelState } from "../../context/ChannelState";
import { supabase } from "../../SupabaseClient";
import Tooltip from "../Tooltip";

const UploadVideo = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const handleUpload = () => {
    videoRef.current.click();
  };

  const uploadVideo = async (e) => {
    console.log('uploading...', uid());
    const file = e.target.files[0];
    console.log(file)
    // const { data, error } = await supabase
    // .storage
    // .from('avatars')
    // .upload('public/avatar1.png', file, {
    //   cacheControl: '3600',
    //   upsert: false
    // })
    // console.log(error)
    const getVideoDuration = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const media = new Audio(reader.result);
      media.onloadedmetadata = () => console.log(resolve(media.duration));
    };
    reader.readAsDataURL(file);
    reader.onerror = error => reject(error);
  });
 const duration = await getVideoDuration(file);
 console.log(duration)
    e.target.value = '';
  }

  const { setShowUpload } = useChannelState();
  return (
    <div className="w-screen lg:h-screen lg:top-2 top-16 flex items-center fixed justify-center z-[10000000000000000000]">
      <div className="shadow-lg bg-white dark:bg-[#282828] p-2 px-4 rounded-xl lg:w-[60vw] lg:h-[80vh] w-[400px] h-[400px]">
        <div className="flex items-center justify-between dark:border-b-gray-200/20 border-b-gray-600 border-b ">
          <h2 className="text-bold text-lg">Upload Videos</h2>

          <div className="flex item-scenter gap-1">
            <Tooltip
              element={
                <ChatBubbleLeftEllipsisIcon className="clickable-icon" />
              }
              width={"w-24"}
              hoverText="Send Feedback"
            />
            <Tooltip
              element={
                <XMarkIcon
                  onClick={() => {
                    router.push("?dashboard=true");
                    setShowUpload(false);
                  }}
                  className="clickable-icon"
                />
              }
              hoverText="Close"
            />
          </div>
        </div>

        <div className="flex-1 flex-col flex items-center justify-center  h-full py-10">
          <CloudArrowUpIcon
            className="icon w-20 h-20 text-gray-700 hover:bg-gray-100 dark:hover:bg-white/5 active:opacity-60  transition"
            onClick={handleUpload}
          />
          <p className="text-bold">Drag and drop video files to upload</p>
          <span className="text-xs my-2 text-gray-600 dark:text-gray-200/90">
            Your videos will be private until you publish them.
          </span>
          <input type="file" accept="video/*" onChange={(e) => uploadVideo(e)} className="w-0" ref={videoRef} />
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl active:ring-4 active:outline-none active:ring-blue-300 transition dark:active:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleUpload}
          >
            Select Files
          </button>
          <span className="text-gray-600/50 dark:text-gray-200/50 text-xs mt-10">
            Please be sure not to violate others copyright or privacy rights.{" "}
            <span className="text-blue-400">Learn more</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
