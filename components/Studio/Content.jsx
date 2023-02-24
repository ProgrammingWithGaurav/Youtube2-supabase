import { AdjustmentsHorizontalIcon, ChartBarSquareIcon, ChatBubbleBottomCenterIcon, PencilIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import { numify } from "numify";
import Tooltip from '../Tooltip';

const SubHeader = ({ Options, activeOption, setActiveOption }) => {
  const { startLoadingBar } = useChannelState();
  const { setLoading, setLoadingProgress } = useStateContext();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center gap-6 my-4 division-bottom">
        {Options?.map((option) => (
          <div
            key={option}
            onClick={() =>
              startLoadingBar(
                setLoading,
                setLoadingProgress,
                setActiveOption(option)
              )
            }
            className={`font-semibold cursor-pointer transition leading-10  py-4 px-2 ${
              activeOption === option
                ? "text-blue-400 dark:text-blue-400 border-b-4 border-b-blue-400"
                : "dark:text-gray-300 text-gray-700"
            }`}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="division-bottom px-6 py-1 pb-2 flex items-center gap-6 w-full opacity-50 dark:opacity-30">
        <AdjustmentsHorizontalIcon className="clickable-icon click-show" />
        <span className="dark:text-white text-lg">Filter</span>
      </div>
    </div>
  );
};

const Video = ({thumbnail, title, description, timestamp, views, comments, likes, dislikes, uid}) => {
  const router = useRouter();
  return (
    <tbody className="w-full border-b border-b-gray-600/20 dark:border-b-gray-200/20">
      <tr className="bg-transparent divison-bottom">
        <th
      
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div
           
              className="w-72 cursor-pointer flex items-center my-1  border-y-[1] gap-1 border-y-gray-gray-600 dark:border-y-gray-300 hover:bg-gray-100 transition px-4 dark:hover:bg-white/10 py-2 dark:bg-neutral-900 rounded-lg"
            >
              <img
               onClick={() => router.push(`/studio/video/${uid}`)}
                src={thumbnail}
                alt="video thumbnail"
                className="rounded-lg object-contain w-28"
              />
              <div className="w-7/12 group">
                <Tooltip element={<p className="text-bold font-semibold hover:underline" onClick={() => router.push(`/studio/video/${uid}`)}>{title}</p>} hoverText={title} />
                <p className="dark:text-gray-300 text-gray-700/80 font-normal text-xs truncate flex-1 group-hover:hidden">
                  {description}
                </p>
                <p className="hidden group-hover:flex items-center mt-2">
                  <PencilIcon className="clickable-icon w-8 h-8 " />
                  <ChartBarSquareIcon className="clickable-icon w-8 h-8 " />
                  <ChatBubbleBottomCenterIcon className="clickable-icon w-8 h-8" />
                  <PlayIcon className="clickable-icon w-8 h-8" />
                </p>
              </div>
            </div>
        </th>
        <td className="px-6 py-4">
          
        <p className="flex flex-col">
                <span className="text-bold">
                  {timestamp?.toDateString()}
                </span>
                <span className="text-xs dark:text-gray-300 text-gray-900">
                  Published
                </span>
              </p>
        </td>
        <td className="px-6 py-4">{numify(views)}</td>
        <td className="px-6 py-4">{comments?.length}</td>
        <td className="px-6 py-4 text-bold">{likes?.length} <span className='text-gray'>vs</span> {dislikes?.length}</td>
      </tr>
    </tbody>
  );
};

const Videos = () => {
  const { videos } = useStateContext();
  const { currentChannel, GetUid } = useChannelState();
  const { uid } = currentChannel;
  const [channelVideos, setChannelVidoes] = useState([]);

  const fetchChannelVideos = () => {
    setChannelVidoes(videos.filter((video) => video?.channelRef === uid));
  };

  useEffect(() => {
    fetchChannelVideos();
  }, []);
  return (
    <div className="relative overflow-x-auto w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-gray-900 dark:text-gray-400 border-b border-b-gray-600/20 dark:border-b-gray-100/20">
          <tr>
            <th scope="col" className="px-6 py-3">
              Video
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Views
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
            <th scope="col" className="text-sm px-6 py-3">
              Likes vs Dislikes
            </th>
          </tr>
        </thead>
        {channelVideos?.map((video) => (
          <Video key={GetUid()} {...video} />
        ))}
      </table>
    </div>
  );
};

const Content = () => {
  const router = useRouter();
  const { setActiveSidebar } = useChannelState();
  const Options = ["Videos", "Live", "Posts", "Playlist", "Podcasts"];
  const { query } = router;
  const [activeOption, setActiveOption] = useState("Videos");

  useEffect(() => {
    query?.content && setActiveSidebar("Content");
  }, [query]);

  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <h2 className="text-bold text-2xl">Channel Content</h2>
      <SubHeader
        Options={Options}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      <Videos />
    </div>
  );
};

export default Content;
