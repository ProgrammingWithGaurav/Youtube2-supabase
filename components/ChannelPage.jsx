import React from "react";
import { useStateContext } from "../context/StateContext";
import Tooltip from "./Tooltip";

const ChannelPage = () => {
  const {
    activeChannel: {
      channelImage,
      channelBannerImage,
      channelName,
      socialLinks,
    },
  } = useStateContext();
  return (
    <div className="w-full h-screen scrollbar bg-red-50 pl-10">
      <div className="w-full h-[35vh] relative">
        <img
          src={channelBannerImage}
          className="w-full h-full object-cover object-left-bottom"
          alt="channel banner"
        />
        <div className="absolute right-2 cursor-pointer bottom-2 gap-2 bg-black/90 p-2 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img
              src={channelImage}
              className="w-4 h-4 rounded-full"
              alt="profile picture"
            />
            <p className="text-white font-semibold text-xs">{channelName}</p>
          </div>
          <div>
            {socialLinks?.map((link) => (
              <Tooltip
                element={
                  <a href={link.url}>
                    <img
                      src={link.logo}
                      alt="social Link"
                      className="w-4 h-4 rounded-full"
                    />
                  </a>
                }
                hoverText={link.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
