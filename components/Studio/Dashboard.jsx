import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import {
  CheckCircleIcon,
  CloudArrowDownIcon,
  CurrencyDollarIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { numify } from "numify";

const DashboardHeader = () => {
  return (
    <div className="w-full flex  items-center lg:justify-between justify-around">
      <h2 className="text-bold text-xl">Channel dashboard</h2>
      <div className="flex items-center gap-2">
        <CloudArrowDownIcon className="video-control clickable-icon click-show" />
        <SignalIcon className="video-control clickable-icon click-show" />
        <PencilSquareIcon className="video-control clickable-icon click-show" />
      </div>
    </div>
  );
};

const VideoPerformance = () => {
  const { videos } = useStateContext();
  const { fetchChannelDetails } = useChannelState();
  const [latestVideo, setLatestVideo] = useState();
  const router = useRouter();

  const handleRecentlyPosted = () => {
    const channelVideos = videos.filter(
      (video) => video?.channelName === channelName
    );
    channelVideos.length > 1 &&
      setChannelVideos(
        channelVideos.sort(
          (video1, video2) =>
            parseFloat(video2.timestamp) - parseFloat(video1.timestamp)
        )
      );
  };

  function getDaysAndHoursFromOldTimestamp(oldTimestamp) {
    const currentTimestamp = new Date().getTime();
    const millisecondsPerHour = 1000 * 60 * 60;
    const millisecondsPerDay = 24 * millisecondsPerHour;
    const totalHours = Math.floor(
      (currentTimestamp - oldTimestamp) / millisecondsPerHour
    );
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    return `First ${days} days and ${hours} hours`;
  }
  function getVideoRank(video) {
    const sortedVideos = videos.slice().sort((a, b) => b.views - a.views);
    const rank = sortedVideos.findIndex((v) => v === video) + 1;
    return `${rank} of ${sortedVideos.length}`;
  }
  return (
    <div className="flex flex-col justify-center dark:text-white rounded-md border dark:border-200/40 border-gray-600/40 p-4 dark:bg-neutral-800">
      <h3 className="text-bold text-lg">Latest video performance</h3>
      <img
        src="https://avatars.githubusercontent.com/u/88154142?v=4"
        alt="latest video"
        className="rounded w-full h-48 my-2 object-cover"
      />
      <p className="text-gray">
        {getDaysAndHoursFromOldTimestamp(new Date("2/15/2022"))}
      </p>

      <div className="flex flex-col my-2 mt-4 space-y-2">
        <p className="flex items-center justify-between text-sm">
          <span>Ranking by views</span>
          <span className="font-semibold">1 of 4 {`>`}</span>
        </p>
        <p className="flex items-center justify-between text-sm">
          <span>views</span>
          <span className="font-semibold">{numify(23231121212)}</span>
        </p>
        <p className="flex items-center justify-between text-sm">
          <span>Impressions click-through rate</span>
          <span className="font-semibold">6.6%</span>
        </p>
        <p className="flex items-center justify-between text-sm">
          <span>Average view duration</span>
          <span className="font-semibold">0:22</span>
        </p>
      </div>

      <button
        className="link-btn text-left"
        onClick={() => {
          router.push("/");
        }}
      >
        Go to video analytics
      </button>
      <button
        className="link-btn text-left"
        onClick={() => {
          router.push("/");
        }}
      >
        See Commments ({numify(232323232)})
      </button>
    </div>
  );
};

const ChannelAnalytics = () => {
  const router = useRouter();
  const { addCommas } = useChannelState();

  return (
    <div className="flex flex-col justify-center space-y-2">
      {/* Achievements */}
      <div className="flex flex-col dark:text-white rounded-md border dark:border-200/40 border-gray-600/40 p-4 dark:bg-neutral-800">
        <h3 className="text-bold text-lg my-2">New achieventment</h3>
        <div className="flex items-center gap-4 my-2">
          <img
            src="https://cdn-icons-png.flaticon.com/128/6334/6334281.png"
            className="w-20 h-20"
            alt="congrats image"
          />
          <p className="flex flex-col space-y-2 text-sm">
            <span className="text-bold">2000 subscribers</span>
            <span className="text-gray">
              More and more people are loving your videos
            </span>
          </p>
        </div>
        <div className="px-4 gap-4 flex items-center">
          <button
            className="link-btn text-left text-sm"
            onClick={() => {
              router.push("/");
            }}
          >
            View Analytics
          </button>
          <EllipsisVerticalIcon className="clickable-icon video-control click-show" />
        </div>
      </div>
      <div className="flex flex-col justify-center dark:text-white rounded-md border dark:border-200/40 border-gray-600/40 p-4 dark:bg-neutral-800">
        <h3 className="text-bold text-lg my-2">Channel analytics</h3>
        <span className="text-bold text-xs">Currnet subscribers</span>
        <h1 className="font-semibold text-2xl leading-10">
          {addCommas(222222000)}
        </h1>
        <p className="flex items-center my-2 text-gray">
          <span className="text-green-400">{`+1`} &nbsp;</span> in 29 days
        </p>
        <div className="w-full h-[1px] bg-gray-600/40 dark:bg-gray-200/40 my-2"></div>

        <h3 className="text-bold my-2">Summary</h3>
        <div className="flex flex-col space-y-1 ">
          <p className="flex items-center justify-between">
            <span>Views</span>
            <span className="flex items-center gap-1 font-semibold">
              {numify(19211232232)}{" "}
              <CheckCircleIcon className="text-green-400 icon" />
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span>Watch time (hours)</span>
            <span className="flex items-center gap-1 font-semibold">
              {numify(1922232)}{" "}
              <CheckCircleIcon className="text-green-400 icon" />
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span>Your estimated revenue</span>
            <span className="flex items-center gap-1 font-semibold">
              {" "}
              <CurrencyDollarIcon className="text-green-400 icon" />
              {addCommas(19211232232)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Ideas = () => {
  return <div>Ideas</div>;
};

const Dashboard = () => {
  const router = useRouter();
  const { setActiveSidebar } = useChannelState();
  const { query } = router;

  useEffect(() => {
    query?.dashboard && setActiveSidebar("Dashboard");
  }, [query]);

  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <DashboardHeader />
      <div className="grid my-3 gap-2 lg:grid-cols-3 md:grid-cols-2 lg:pr-0 pr-10 sm:grid-cols-1">
        <VideoPerformance /> {/* Latest Video Performance */}
        <ChannelAnalytics /> {/* Channel Subscriber Analytics */}
        <Ideas /> {/* Channel Subscriber Analytics */}
      </div>
    </div>
  );
};

export default Dashboard;
