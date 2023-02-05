import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useStateContext } from "../context/StateContext";
import Tooltip from "./Tooltip";
import { numify } from "numify";

const ChannelHeader = () => {
  const {
    activeChannel: {
      channelImage,
      channelBannerImage,
      channelName,
      socialLinks,
      channelDisplayName,
      subscribers,
    },
    setLoading,
    setLoadingProgress,
    channelTabs,
    channelTab,
    setChannelTab,
  } = useStateContext();
  const [subscribed, setSubscribed] = useState(false);
  const scrollRef = useRef();

  const Subscribe = () => {
    setLoading(true);
    setLoadingProgress(90);
    setTimeout(() => {
      setLoadingProgress(100);
      setLoading(false);
      setSubscribed(true);
    }, 2000);
  };
  const Unsubscribe = () => {
    setLoading(true);
    setLoadingProgress(90);
    setTimeout(() => {
      setLoadingProgress(100);
      setLoading(false);
      setSubscribed(false);
    }, 2000);
  };

  return (
    <div className="w-full h-screen scrollbar overflow-x-hidden pl-10">
      <div className="w-full h-[35vh] relative">
        <img
          src={channelBannerImage}
          className="w-full h-full object-cover object-left-bottom"
          alt="channel banner"
        />
        <div className="absolute right-2 cursor-pointer bottom-2 gap-4 bg-white dark:bg-black/90 p-2 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img
              src={channelImage}
              className="w-4 h-4 rounded-full"
              alt="profile picture"
            />
            <p className="text-neutral-900 dark:text-white font-semibold text-xs">
              {channelName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks?.map((link) => (
              <Tooltip
                key={link.name}
                element={
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={link.logo}
                      alt="social Link"
                      className="w-4 h-4 hover:bg-white/10 rounded-full"
                    />
                  </a>
                }
                hoverText={link.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center w-screen px-10 my-4">
        <img
          src={channelImage}
          alt="channel Profile Image"
          className="w-20 h-20 rounded-full"
        />
        <div className="lg:w-10/12 flex flex-col w-8/12 ml-4">
          <span className="font-semibold dark:text-white text-2xl">
            {channelDisplayName}
          </span>
          <span className="text-sm dark:text-gray-400">@{channelName}</span>
          <span className="text-sm dark:text-gray-400">
            {numify(subscribers)}{" "}
            {subscribers <= 1 ? "Subscriber" : "Subscribers"}
          </span>
        </div>
        <div>
          {subscribed ? (
            <div
              onClick={Unsubscribe}
              className="space-x-2 dark:hover:bg-neutral-700 mr-8 text-neutral-900 dark:text-white dark:bg-neutral-800 flex items-center py-2 px-4 bg-gray-100 text-xs rounded-full cursor-pointer font-semibold hover:bg-gray-200"
            >
              <BellIcon className="icon p-0 w-6 h-6" />
              <span>Subscribed</span>
              <ChevronDownIcon className="icon p-0 w-4 h-4" />
            </div>
          ) : (
            <button
              onClick={Subscribe}
              className="text-white dark:text-neutral-900 bg-neutral-900 dark:bg-white text-xs rounded-full px-4 py-2 cursor-pointer font-semibold hover:opacity-90"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
      <div
        className="flex w-[65vw] scrollbar gap-2 items-center lg:w-screen px-10 my-4"
        ref={scrollRef}
      >
        {channelTabs?.map((option) => (
          <div
            key={option}
            className={`cursor-pointer font-semibold transition hover:text-neutral-900 dark:hover:text-white px-4 py-2 text-lg ${
              channelTab === option
                ? "border-b-neutral-900 border-b-2 text-neutral-900 dark:text-white dark:border-b-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setChannelTab(option)}
          >
            {option}
          </div>
        ))}
        <ChevronRightIcon
          onClick={() => scrollRef.current.scrollIntoView()}
          className="lg:hidden clickable-icon absolute right-4"
        />
      </div>
    </div>
  );
};

export default ChannelHeader;
