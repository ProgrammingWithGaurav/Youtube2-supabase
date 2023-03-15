import { BellIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { numify } from "numify";
import React, { useEffect, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import { supabase } from "../../SupabaseClient";

const Channel = ({ channelRef }) => {
  const router = useRouter();
  const { currentChannel, fetchChannelDetails, Subscribe, UnSubscribe } =
    useChannelState();
  const [channelDetails, setChannelDetails] = useState();
  const [isSubscribed, setIsSubscribed] = useState();

  const [updatedSubscribers, setUpdatedSubscribers] = useState(0);

  useEffect(() => {
    const myFunction = async () => {
      const details = await fetchChannelDetails(channelRef);
      const { data } = await supabase
        .from("channelInfo")
        .select()
        .eq("channelRef", channelRef);
      const subscribers = data[0]?.subscribers;
      subscribers?.includes(currentChannel?.uid) && setIsSubscribed(true);
      setUpdatedSubscribers(subscribers?.length);
      setChannelDetails({ ...details, subscribers: subscribers });
    };
    myFunction();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      <img
        src={channelDetails?.channelImage}
        alt="channel image"
        onClick={() => {
          router.push(`/@${channelDetails?.channelName}`);
          window.location.reload();
        }}
        className="rounded-full w-28 h-28 myb-2  cursor-pointer"
      />
      <p className="font-bold text-center text-xl">
        {channelDetails?.channelDisplayName}
      </p>

      {channelDetails?.subscribers && (
        <>
          <span className="text-gray text-xs">
            {numify(updatedSubscribers)}{" "}
            {channelDetails?.subscribers?.length <= 1
              ? "Subscriber"
              : "Subscribers"}
          </span>
          <div>
            {isSubscribed ? (
              <div
                // onClick={Unsubscribe}

                onClick={() =>
                  UnSubscribe(
                    setUpdatedSubscribers,
                    setIsSubscribed,
                    channelRef
                  )
                }
                className="mt-4 space-x-2 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white dark:bg-neutral-800 flex items-center py-2 px-4 bg-gray-100 text-sm rounded-full cursor-pointer font-semibold hover:bg-gray-200"
              >
                <BellIcon className="icon mr-2 p-0 w-6 h-6" />
                <span>Subscribed</span>
              </div>
            ) : (
              <button
                // onClick={Subscribe}
                onClick={() =>
                  Subscribe(setUpdatedSubscribers, setIsSubscribed, channelRef)
                }
                className="subscribe mt-4"
              >
                Subscribe
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ChannelChannels = () => {
  const {
    activeChannel: { uid },
  } = useStateContext();
  const [subscriptions, setSubscriptions] = useState([]);
  const { currentChannel } = useChannelState();
  useEffect(() => {
    const fetchSubscriptions = async () => {
      let currentSubscriptions = [];
      const { data: channels } = await supabase.from("channelInfo").select();
      channels.map(
        (channel) =>
          channel?.subscribers?.includes(uid) &&
          currentSubscriptions.push(channel?.channelRef)
      );
      setSubscriptions(currentSubscriptions);
    };
    fetchSubscriptions();
  }, []);

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
