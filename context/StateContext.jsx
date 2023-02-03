"use client";
import { useContext, createContext, useState } from "react";

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
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [appearance, setAppearance] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("Home");
  const [activeSubscription, setActiveSubscription] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchString, setSearchString] = useState("");
  const [user, setUser] = useState(true);

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
      icon:<Cog6ToothIcon className="icon" />,
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

  const [subscriptions, setSubscription] =  useState([ 
    {
      channelName: 'CleverProgrammer',
      channelDisplayName: 'Clever Programmer',
      channelImage: 'https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s68-c-k-c0x00ffffff-no-rj'
    }
  ])

  const [videos, setVideos] = useState([
    {
      thumbnail: 'https://i.ytimg.com/vi/XIrOM9oP3pA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiN7R1akv6_cbfMTpTV_lUm1PgaQ',
      title: 'How to make a Youtube Clone with React JS for Beginners',
      channelName: 'CleverProgrammer',
      channelDisplayName: 'Clever Prorammer',
      views: '1.2M Views',
      timestamp: new Date(),
      duration: '10:00',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      url: 'https://www.youtube.com/watch?v=XIrOM9oP3pA',
      channelImage: 'https://yt3.ggpht.com/ytc/AL5GRJXoWnTXp_oljCbsD07kYmc6Vktj3J0Vs64ALooxgA=s68-c-k-c0x00ffffff-no-rj',
    }
  ]);

  const Categories = [
    "All", "Programming", "Development", "Github", "AI", "Python", "Gaming", "Genshin Impact", "Youtube", "Twitter", "Facebook", "Instagram", "TikTok", "Snapchat", "WhatsApp", "Messenger", "Telegram", "Discord", "Reddit", "Quora"
  ]

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
        setVideos
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);