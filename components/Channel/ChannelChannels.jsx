import { BellIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { numify } from "numify";
import React, { useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";

const Channel = ({ channelRef }) => {
  const router = useRouter();
  const { currentChannel, fetchChannelDetails } = useChannelState();
  const { channelImage, channelName, channelDisplayName, subscribers } =
    fetchChannelDetails(channelRef);
  const isSubscribed = (myChannelRef) => {
    const channels = currentChannel.subscriptions.filter(
      (channelRef) => channelRef === myChannelRef
    );
    return channels.length > 0;
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      <img
        src={channelImage}
        alt="channel image"
        onClick={() => {
          router.push(`/@${channelName}`);
          window.location.reload();
        }}
        className="rounded-full w-28 h-28 myb-2  cursor-pointer"
      />
      <p className="font-bold text-center text-xl">{channelDisplayName}</p>
      <span className="text-gray text-xs">
        {numify(subscribers)} {subscribers <= 1 ? "Subscriber" : "Subscribers"}
      </span>
      <div>
        {isSubscribed(channelRef) ? (
          <div
            // onClick={Unsubscribe}
            className="mt-4 space-x-2 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white dark:bg-neutral-800 flex items-center py-2 px-4 bg-gray-100 text-sm rounded-full cursor-pointer font-semibold hover:bg-gray-200"
          >
            <BellIcon className="icon mr-2 p-0 w-6 h-6" />
            <span>Subscribed</span>
          </div>
        ) : (
          <button
            // onClick={Subscribe}
            className="subscribe mt-4"
          >
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
};

const ChannelChannels = () => {
  const {
    activeChannel: { subscriptions },
  } = useStateContext();

  return (
    <div className="w-full mx-auto flex items-start flex-col space-y-2 p-4 mt-10 dark:text-white h-screen">
      <p className="font-semibold text-lg mb-8">Subscriptions</p>

      <div className="flex items-center flex-wrap space-y-10 ">
        {subscriptions.map((channelRef) => (
          <Channel key={channelRef} channelRef={channelRef} />
        ))}
      </div>
    </div>
  );
};

export default ChannelChannels;
