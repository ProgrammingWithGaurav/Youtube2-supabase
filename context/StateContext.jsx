"use client";
import { useContext, createContext, useState, useEffect } from "react";

// Icons
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  MoonIcon,
  PlayIcon,
  SunIcon,
  UserCircleIcon,
  UserPlusIcon,
  VideoCameraIcon,
  RectangleStackIcon,
  PlayCircleIcon,
  ClockIcon,
  SwatchIcon,
  Cog6ToothIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as ActiveHomeIcon,
  VideoCameraIcon as ActiveVideoCameraIcon,
  RectangleStackIcon as ActiveRectangleStackIcon,
  PlayCircleIcon as ActivePlayCircleIcon,
  ClockIcon as ActiveClockIcon,
  SwatchIcon as ActiveSwatchIcon,
  Cog6ToothIcon as ActiveCog6ToothIcon,
  HandThumbUpIcon as ActiveHandThumbUpIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { uid } from "uid";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [appearance, setAppearance] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);

  const [activeSidebar, setActiveSidebar] = useState("Home");
  const [activeSubscription, setActiveSubscription] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [channelTab, setChannelTab] = useState("Home");
  const [activeVideo, setActiveVideo] = useState();

  const [searchString, setSearchString] = useState("");
  const [user, setUser] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [activeChannel, setActiveChannel] = useState();

  const router = useRouter();

  const ProfileMenuIcons = [
    {
      name: "Your Channel",
      icon: <UserCircleIcon className="icon" />,
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      name: "Youtube Studio",
      icon: <PlayIcon className="icon" />,
      onClick: () => {
        router.push("/studio");
      },
    },
    {
      name: "Switch Account",
      icon: <UserPlusIcon className="icon" />,
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      name: "Sign Out",
      icon: <ArrowLeftOnRectangleIcon className="icon" />,
      onClick: () => {
        router.push("/login");
      },
    },
    {
      name: appearance === "dark" ? "Light Mode" : "Dark Mode",
      icon:
        appearance === "dark" ? (
          <SunIcon className="icon" />
        ) : (
          <MoonIcon className="icon" />
        ),
      onClick: () => {
        setAppearance(appearance === "dark" ? "light" : "dark");
      },
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="icon" />,
      onClick: () => {
        router.push("/settings");
      },
    },
  ];

  const SidebarIcons = [
    {
      name: "Home",
      icon: <HomeIcon className="icon" />,
      activeIcon: <ActiveHomeIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Shorts",
      icon: <VideoCameraIcon className="icon" />,
      activeIcon: <ActiveVideoCameraIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Subscriptions",
      icon: <RectangleStackIcon className="icon" />,
      activeIcon: <ActiveRectangleStackIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Library",
      icon: <PlayCircleIcon className="icon" />,
      activeIcon: <ActivePlayCircleIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "History",
      icon: <ClockIcon className="icon" />,
      activeIcon: <ActiveClockIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Watch Later",
      icon: <SwatchIcon className="icon" />,
      activeIcon: <ActiveSwatchIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Settings",
      icon: <Cog6ToothIcon className="icon" />,
      activeIcon: <ActiveCog6ToothIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Liked Videos",
      icon: <HandThumbUpIcon className="icon" />,
      activeIcon: <ActiveHandThumbUpIcon className="icon" />,
      onClick: () => {
        router.push("/");
      },
    },
  ];

  const [subscriptions, setSubscription] = useState([
    {
      channelName: "CleverProgrammer",
      channelDisplayName: "Clever Programmer",
      channelImage:
        "https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s68-c-k-c0x00ffffff-no-rj",
    },
  ]);

  const [videos, setVideos] = useState([
    {
      thumbnail:
        "https://i.ytimg.com/vi/XIrOM9oP3pA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiN7R1akv6_cbfMTpTV_lUm1PgaQ",
      title: "How to make a Youtube Clone with React JS for Beginners",
      channelName: "CleverProgrammer",
      channelDisplayName: "Clever Prorammer",
      views: 1313121,
      timestamp: new Date(),
      subscribers: 1222000,
      duration: 500,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      url: "https://www.youtube.com/watch?v=XIrOM9oP3pA",
      type: "programming",
      channelImage:
        "https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s68-c-k-c0x00ffffff-no-rj",
      uid: "802618681ff",
      comments: [
        {
          channelName: "Gaurav",
          timestamp: new Date(),
          channelDisplayName: "Gaurav",
          comment: "This is an awesome video 🙂",
          uid: 32553252,
          channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
          gotHeart: true,
          likes: [
            'Gaurav'
          ],
          replies: [
            {
              channelName: "Gaurav",
              channelDisplayName: "Gaurav",
              channelImage:
                "https://avatars.githubusercontent.com/u/88154142?v=4",
              reply: "This is my reply 🙂",
              timestamp: new Date(),
            },
          ],
        },
        
        {
          channelName: "CleverProgrammer",
          timestamp: new Date(),
          channelDisplayName: "Clever Programmer",
          comment: "Thanks",
          uid: 32553252,
          channelImage: "https://avatars.githubusercontent.com/u/88154142?v=4",
          gotHeart: true,
          likes: [
            'Gaurav'
          ],
          replies: [
            {
              channelName: "Gaurav",
              channelDisplayName: "Gaurav",
              channelImage:
                "https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s88-c-k-c0x00ffffff-no-rj",
              reply: "This is my reply 🙂",
              timestamp: new Date(),
            },
          ],
        },
      ],
    },
    {
      thumbnail:
        "https://i.ytimg.com/vi/_6Zhfts2iao/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAMsuyEuPTwZh9umlkAV2Vm5dmLLQ",
      title:
        "Top 5 Programming Languages to Learn in 2023 to Get a Job Without a College",
      channelName: "CleverProgrammer",
      channelDisplayName: "Clever Prorammer",
      views: 1222222222,
      timestamp: new Date(),
      duration: 500,
      subscribers: 1222000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      url: "https://www.youtube.com/watch?v=XIrOM9oP3pA",
      type: "programming",
      channelImage:
        "https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s68-c-k-c0x00ffffff-no-rj",
      uid: "802618681ff2",
      comments: [],
    },
    {
      thumbnail:
        "https://i.ytimg.com/an_webp/QObVQSmlG_c/mqdefault_6s.webp?du=3000&sqp=CI2P954G&rs=AOn4CLC1tQrXDYbVW6bWzMWqqtlQ6MJAPw",
      title: "Build Turo Web3 App with NextJS",
      channelName: "CleverProgrammer2",
      channelDisplayName: "Clever Prorammer",
      views: 1222222131,
      timestamp: new Date(),
      duration: 500,
      subscribers: 122200,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      url: "https://www.youtube.com/watch?v=XIrOM9oP3pA",
      type: "programming",
      channelImage:
        "https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s68-c-k-c0x00ffffff-no-rj",
      uid: "802618681ff1",
      comments: [],
    },
  ]);

  const Categories = [
    "All",
    "Programming",
    "Development",
    "Github",
    "AI",
    "Python",
    "Gaming",
    "Genshin Impact",
    "Youtube",
    "Twitter",
    "Facebook",
    "Instagram",
    "TikTok",
    "Snapchat",
    "WhatsApp",
    "Messenger",
    "Telegram",
    "Discord",
    "Reddit",
    "Quora",
  ];

  const VideoOptions = [
    {
      name: "Save to Watch Later",
      icon: <ClockIcon className="icon" />,
      onClick: () => {
        console.log("saved video to watch later");
      },
    },
    {
      name: "Add To Playlislt",
      icon: <PlusIcon className="icon" />,
      onClick: () => {
        console.log("saved video to watch later");
      },
    },
    {
      name: "Share",
      icon: <ShareIcon className="icon" />,
      onClick: () => {
        console.log("saved video to watch later");
      },
    },
  ];

  const channelTabs = [
    "Home",
    "Videos",
    "Shorts",
    "Live",
    "Playlists",
    "Community",
    "Store",
    "Channels",
    "About",
  ];

  return (
    <StateContext.Provider
      value={{
        appearance,
        setAppearance,
        isSidebar,
        setIsSidebar,
        searchString,
        setSearchString,
        ProfileMenuIcons,
        SidebarIcons,
        user,
        setUser,
        activeSidebar,
        setActiveSidebar,
        subscriptions,
        activeSubscription,
        setActiveSubscription,
        Categories,
        activeCategory,
        setActiveCategory,
        videos,
        setVideos,
        VideoOptions,
        activeChannel,
        setActiveChannel,
        loading,
        setLoading,
        loadingProgress,
        setLoadingProgress,
        channelTabs,
        channelTab,
        setChannelTab,
        activeVideo,
        setActiveVideo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);
