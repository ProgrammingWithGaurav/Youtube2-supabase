import { BellIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { numify } from "numify";
import React from "react";
import { useStateContext } from "../../context/StateContext";

const Channel = ({ image, name, displayName, subscribers }) => {
  const router = useRouter();
  return (
    <div classsName="flex flex-col my-4 mx-8 justify-center items-center space-y-1">
      <img
        src={image}
        alt="channel image"
        onClick={() => router.push(`/${name}`)}
        className="rounded-full w-28 h-28 myb-2"
      />
      <p className="font-bold text-center text-lg pr-12">{displayName}</p>
      <span className="text-sm text-center dark:text-gray-400">
        {numify(subscribers)} {subscribers <= 1 ? "Subscriber" : "Subscribers"}
      </span>
      <div>
        {true ? (
          <div
            // onClick={Unsubscribe}
            className="mt-4 4space-x-2 dark:hover:bg-neutral-700 mr-8 text-neutral-900 dark:text-white dark:bg-neutral-800 flex items-center py-2 px-4 bg-gray-100 text-sm rounded-full cursor-pointer font-semibold hover:bg-gray-200"
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

      <div className="flex items-center flex-wrap">
        {subscriptions.map(
          ({ channelImage, channelName, channelDisplayName, subscribers }) => (
            <Channel
              image={channelImage}
              name={channelName}
              displayName={channelDisplayName}
              subscribers={subscribers}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ChannelChannels;
