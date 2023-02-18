import React from "react";
import {
  ChartBarSquareIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
  ChatBubbleBottomCenterIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  MusicalNoteIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  RectangleGroupIcon as ActiveRectangleGroupIcon,
  PlayCircleIcon as ActivePlayCircleIcon,
  ChatBubbleBottomCenterIcon as ActiveChatBubbleBottomCenterIcon,
  ChartBarSquareIcon as ActiveChartBarSquareIcon,
  ExclamationCircleIcon as ActiveExclamationCircleIcon,
  CurrencyDollarIcon as ActiveCurrencyDollarIcon,
  MusicalNoteIcon as ActiveMusicalNoteIcon,
  SparklesIcon as ActiveSparklesIcon,
} from "@heroicons/react/24/solid";
import { useStateContext } from "../../context/StateContext";
import { useChannelState } from "../../context/ChannelState";

const SidebarOptions = [
  {
    name: "Dashboard",
    icon: <RectangleGroupIcon className="studio-sidebar-icon" />,
    activeIcon: <ActiveRectangleGroupIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
  {
    name: "Content",
    icon: <PlayCircleIcon className="studio-sidebar-icon" />,
    activeIcon: <ActivePlayCircleIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
  {
    name: "Analytics",
    icon: <ChartBarSquareIcon className="studio-sidebar-icon" />,
    activeIcon: <ActiveChartBarSquareIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
  {
    name: "Comments",
    icon: <ChatBubbleBottomCenterIcon className="studio-sidebar-icon" />,
    activeIcon: (
      <ActiveChatBubbleBottomCenterIcon className="studio-sidebar-icon" />
    ),
    onClick: () => {},
  },
  {
    name: "Copyright",
    icon: <ExclamationCircleIcon className="studio-sidebar-icon" />,
    activeIcon: <ActiveExclamationCircleIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
  {
    name: "Earn",
    icon: <CurrencyDollarIcon className="studio-sidebar-icon" />,
    activeIcon: <ActiveCurrencyDollarIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
  {
    name: "Customization",
    icon: <SparklesIcon className="studio-sidebar-icon" />,
    activeIcon: <ActiveSparklesIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
  {
    name: "Audio Library",
    icon: <MusicalNoteIcon className="studio-sidebar-icon" />,
    activeIcon: <ActiveMusicalNoteIcon className="studio-sidebar-icon" />,
    onClick: () => {},
  },
];

const Sidebar = () => {
  const { isSidebar, setLoading, setLoadingProgress } = useStateContext();
  const { activeSidebar, setActiveSidebar } = useChannelState();

  return (
    <div
      className={`${
        isSidebar ? "min-w-[200px]" : "max-w-[60px]"
      } h-screen flex flex-col p-2 mt-4 scrollbar z-[100] bg-white fixed left-0 dark:bg-neutral-900 top-10 pb-10 pt-2`}
    >
      {SidebarOptions?.map((option) => (
        <div
          key={option.name}
          onClick={() => {
            setLoading(true);
            setLoadingProgress(90);
            setTimeout(() => {
              setLoadingProgress(100);
            }, 500);

            setTimeout(() => {
              setLoadingProgress(100);
              option.onClick();
              setActiveSidebar(option.name);
              setLoading(false);
            }, 700);
          }}
          className={`text-xs flex items-center text-gray-600 dark:text-gray-300 gap-2 p-2 cursor-pointer py-2 font-semibold ${
            isSidebar ? "lg:pr-6 pr-4" : "pr-2"
          } ${
            activeSidebar === option.name
              ? "text-red-500 dark:text-red-500 border-l-4 bg-gray-100 border-red-500 dark:bg-black/50"
              : ""
          }`}
        >
          {activeSidebar === option.name ? option.activeIcon : option.icon}
          {isSidebar && option.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
