import React, { useEffect, useState } from "react";
import {
  ChartBarSquareIcon,
  ChatBubbleBottomCenterIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilIcon,
  FilmIcon,
} from "@heroicons/react/24/outline";
import {
  RectangleGroupIcon as ActiveRectangleGroupIcon,
  PlayCircleIcon as ActivePlayCircleIcon,
  ChatBubbleBottomCenterIcon as ActiveChatBubbleBottomCenterIcon,
  ChartBarSquareIcon as ActiveChartBarSquareIcon,
  ExclamationCircleIcon as ActiveExclamationCircleIcon,
  CurrencyDollarIcon as ActiveCurrencyDollarIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon,
  ChatBubbleLeftEllipsisIcon as ActiveChatBubbleLeftEllipsisIcon,
  PencilIcon as ActivePencilIcon,
  FilmIcon as ActiveFilmIcon,
} from "@heroicons/react/24/solid";
import { useStateContext } from "../../../context/StateContext";
import { useChannelState } from "../../../context/ChannelState";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { query } = router;

  const SidebarOptions = [
    {
      name: "Edit",
      icon: <PencilIcon className="studio-sidebar-icon" />,
      activeIcon: <ActivePencilIcon className="studio-sidebar-icon" />,
    },
    {
      name: "Analytics",
      icon: <ChartBarSquareIcon className="studio-sidebar-icon" />,
      activeIcon: <ActiveChartBarSquareIcon className="studio-sidebar-icon" />,
    },
    {
      name: "Comments",
      icon: <ChatBubbleBottomCenterIcon className="studio-sidebar-icon" />,
      activeIcon: (
        <ActiveChatBubbleBottomCenterIcon className="studio-sidebar-icon" />
      ),
    },
    {
      name: "Editor",
      icon: <FilmIcon className="studio-sidebar-icon" />,
      activeIcon: <ActiveFilmIcon className="studio-sidebar-icon" />,
    },
    {
      name: "Copyright",
      icon: <ExclamationCircleIcon className="studio-sidebar-icon" />,
      activeIcon: (
        <ActiveExclamationCircleIcon className="studio-sidebar-icon" />
      ),
    },
    {
      name: "Earn",
      icon: <CurrencyDollarIcon className="studio-sidebar-icon" />,
      activeIcon: <ActiveCurrencyDollarIcon className="studio-sidebar-icon" />,
    },
  ];

  const BottomSidebarOptions = [
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="studio-sidebar-icon" />,
      activeIcon: <ActiveCog6ToothIcon className="studio-sidebar-icon" />,
    },
    {
      name: "Send Feedback",
      icon: <ChatBubbleLeftEllipsisIcon className="studio-sidebar-icon" />,
      activeIcon: (
        <ActiveChatBubbleLeftEllipsisIcon className="studio-sidebar-icon" />
      ),
    },
  ];
  const { isSidebar, setLoading, setLoadingProgress } = useStateContext();
  const {
    videoDetailSidebar,
    setVideoDetailSidebar,
    bottomActiveSidebar,
    fetchVideoDetails,
    startLoadingBar,
  } = useChannelState();
  const [videoDetails, setVideoDetails] = useState();

  async function getVideoDetails() {
    const details = await fetchVideoDetails(query?.uid);
   await setVideoDetails(details);
  }

  useEffect(() => {
    getVideoDetails();
  }, []);
  return (
    <div
      className={`${
        isSidebar ? "min-w-[200px]" : "max-w-[60px]"
      } h-screen flex flex-col p-2 mt-2 mb-4 scrollbar z-[100] bg-white fixed left-0 dark:bg-neutral-900 top-10 pb-10 pt-2`}
    >
      <div
        className={`flex flex-col ${
          isSidebar && "mb-2"
        } items-center justify-center bg-transparent`}
      >
        <span
          className="cursor-pointer group"
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_BASE_URL}/watch/${query?.uid}`
            )
          }
        >
          <img
            className={`rounded-xl ${
              isSidebar ? "w-44 h-28" : "w-10 h-10"
            }  p-2`}
            src={videoDetails?.thumbnail}
            alt="channel image"
          />
          <span
            className={`bg-transparent ${
              isSidebar ? "w-28 h-28" : "w-6 h-6 top-4 right-5 "
            } absolute rounded-full hidden top-0 group-hover:bg-black/20 group-hover:flex items-center  justify-center`}
          >
            <ArrowTopRightOnSquareIcon className="icon" />
          </span>
        </span>
        {isSidebar && (
          <div className="flex flex-col items-center">
            <span className="text-bold text-xs">Your Video</span>
            <span className="text-gray text-xs">{videoDetails?.title}</span>
          </div>
        )}
      </div>
      <div className="lg:h-3/6 h-2/6 my-2 py-2 scrollbar dark:scrollbar-thumb-[#3f4145] scrollbar-thumb-[#c9ccd0] flex flex-col border-b border-b-gray-600/30 dark:border-b-gray-200/30">
        {SidebarOptions?.map((option) => (
          <div
            key={option.name}
            onClick={() => {
              startLoadingBar(
                setLoading,
                setLoadingProgress,
                () =>
                  router.push(
                    `/studio/video/${query?.uid}/?${option?.name
                      ?.toLowerCase()
                      ?.replace(" ", "")}=true`
                  ),
                () => setVideoDetailSidebar(option.name)
              );
            }}
            className={`text-xs flex items-center text-gray-600 dark:text-gray-300 gap-2 p-2 cursor-pointer py-2 font-semibold ${
              isSidebar ? "lg:pr-6 pr-4" : "pr-2"
            } ${
              videoDetailSidebar === option.name
                ? "text-red-500 dark:text-red-500 border-l-4 bg-gray-100 border-red-500 dark:bg-black/50"
                : ""
            }`}
          >
            {videoDetailSidebar === option.name
              ? option.activeIcon
              : option.icon}
            {isSidebar && option.name}
          </div>
        ))}
      </div>
      {BottomSidebarOptions?.map((option) => (
        <div
          key={option.name}
          onClick={() => {
            startLoadingBar(setLoading, setLoadingProgress, () =>
              setBottomActiveSidebar(option?.name)
            );
          }}
          className={`text-xs flex items-center text-gray-600 dark:text-gray-300 gap-2 p-2 cursor-pointer py-2 font-semibold ${
            isSidebar ? "lg:pr-6 pr-4" : "pr-2"
          } ${
            bottomActiveSidebar === option.name
              ? "text-indigo-500 dark:text-indigo-500 border-l-4 bg-gray-100 border-indigo-500 dark:bg-black/50"
              : ""
          }`}
        >
          {bottomActiveSidebar === option.name
            ? option.activeIcon
            : option.icon}
          {isSidebar && option.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
