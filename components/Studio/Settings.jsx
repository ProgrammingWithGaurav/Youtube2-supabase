import {
  ChatBubbleLeftEllipsisIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import Tooltip from "../Tooltip";

const GeneralSetting = () => {
  return <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">GeneralSetting</div>;
};

const ChannelSetting = () => {
  return <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">ChannelSetting</div>;
};

const UploadDefaults = () => {
  return <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">UploadDefaults</div>;
};

const Permissions = () => {
  return <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">Permissions</div>;
};

const Community = () => {
  return <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">Community</div>;
};

const Agreements = () => {
  return <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">Agreements</div>;
};

const Settings = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const { query } = router;
  const { setLoading, setLoadingProgress } = useStateContext();
  const [setting, setSetting] = useState("General");
  const { setBottomActiveSidebar, startLoadingBar, GetUid } = useChannelState();

  const Settings = [
    "General",
    "Channel",
    "Upload Defaults",
    "Permissions",
    "Community",
    "Agreements",
  ];

  return (
    <div className="w-screen lg:h-screen lg:top-2 top-16 flex items-center fixed justify-center z-[10000000000000000000]">
      <div className="shadow-lg bg-white dark:bg-[#282828] p-2 px-4 rounded-xl lg:w-[60vw] lg:h-[80vh] w-[400px] h-[400px]">
        <div className="flex items-center justify-between dark:border-b-gray-200/20 border-b-gray-600 border-b ">
          <h2 className="text-bold text-lg">Settings</h2>

          <div className="flex item-scenter gap-1">
            <Tooltip
              element={
                <ChatBubbleLeftEllipsisIcon
                  onClick={() =>
                    startLoadingBar(setLoading, setLoadingProgress, () =>
                      setBottomActiveSidebar("Send Feedback")
                    )
                  }
                  className="clickable-icon"
                />
              }
              width={"w-24"}
              hoverText="Send Feedback"
            />
            <Tooltip
              element={
                <XMarkIcon
                  onClick={() => {
                    setBottomActiveSidebar("");
                  }}
                  className="clickable-icon"
                />
              }
              hoverText="Close"
            />
          </div>
        </div>

        <div className="flex items-center my-1">
          <div className="flex flex-col justify-center border-r h-full pr-4 dark:border-r-gray-100/10 border-r-gray-600/10 text-neutral-900 dark:text-white">
            {Settings.map((settingOption) => (
              <div
                key={GetUid()}
                onClick={() => setSetting(settingOption)}
                className={`click-show cursor-pointer py-3 text-sm font-medium px-2 pr-6 rounded transition ${
                  setting === settingOption
                    ? "dark:bg-neutral-900 bg-gray-200"
                    : "dark:hover:bg-stone-900 hover:bg-gray-100"
                }`}
              >
                {settingOption}
              </div>
            ))}
          </div>
          <div className="flex-1 h-max p-4 dark:text-white">
            {setting === "General" && <GeneralSetting />}
            {setting === "Channel" && <ChannelSetting />}
            {setting === "Upload Defaults" && <UploadDefaults />}
            {setting === "Permissions" && <Permissions />}
            {setting === "Community" && <Community />}
            {setting === "Agreements" && <Agreements />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
