import {
  CloudArrowUpIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useChannelState } from "../../context/ChannelState";
import Tooltip from "../Tooltip";

const UploadVideo = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const handleUpload = () => {
    videoRef.current.click();
  };

  const { setShowUpload } = useChannelState();
  return (
    <div className="w-screen lg:h-screen lg:top-2 top-16 flex items-center fixed justify-center z-[10000000000000000000]">
      <div className="shadow-lg bg-white dark:bg-[#282828] p-2 px-4 rounded-xl lg:w-[60vw] lg:h-[80vh] w-[400px] h-[400px]">
        <div className="flex items-center justify-between dark:border-b-gray-200/20 border-b-gray-600 border-b ">
          <h2 className="text-bold text-lg">Upload Videos</h2>

          <div className="flex item-scenter gap-1">
            <Tooltip
              element={<ExclamationCircleIcon className="clickable-icon" />}
              width={"w-24"}
              hoverText="Send Feedback"
            />
            <Tooltip
              element={
                <XMarkIcon
                  onClick={() => {
                    router.push("/studio");
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
          <span className="text-xs my-2">
            Your videos will be private until you publish them.
          </span>
          <input type="file" accept="video/*" className="w-0" ref={videoRef} />
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl active:ring-4 active:outline-none active:ring-blue-300 transition dark:active:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleUpload}
          >
            Select Files
          </button>
          <span className="text-gray-600/50 dark:text-gray-200/50 text-xs mt-10">
            Please be sure not to violate others' copyright or privacy rights.
            Learn more
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
