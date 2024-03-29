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
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { supabase } from "../SupabaseClient";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [appearance, setAppearance] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);

  const [activeSidebar, setActiveSidebar] = useState("Home");
  const [activeSubscription, setActiveSubscription] = useState("");
  const [activeCataegory, setActiveCataegory] = useState("All");
  const [activeVideo, setActiveVideo] = useState("");
  const [channelTab, setChannelTab] = useState("Home");
  const [videoOption, setVideoOption] = useState("");
  // video option will contain a uid of the video through which we can add that video the user's playlist/library when they save to watch later/playlist
  const [shareDialog, setShareDialog] = useState({
    videoUrl: "",
    open: false,
    title: "",
    thumbnail: "",
  });
  const [toast, setToast] = useState({
    text: "",
    icon: "",
    color: "",
    open: false,
  });

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
      onClick: (channelName) => {
        router.push(`/${channelName}`);
        window.location.reload();
      },
    },
    {
      name: router.pathname === "/studio" ? "Youtube" : "Youtube Studio",
      icon: <PlayIcon className="icon" />,
      onClick: () => {
        router.pathname === "/studio"
          ? router.push("/")
          : router.push("/studio?dashboard=true");
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
      onClick: async () => {
        await supabase.auth.signOut();
        window.location.reload();
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
        setSearchString('');
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
        router.push("/feed/subscriptions");
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
        router.push("/playlist/WL");
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
        router.push("/playlist/LL");
      },
    },
  ];

  const [videos, setVideos] = useState([]);
  // [
  //   {
  //     thumbnail:
  //       "https://i.ytimg.com/vi/XIrOM9oP3pA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiN7R1akv6_cbfMTpTV_lUm1PgaQ",
  //     title: "How to make a Youtube Clone with React JS for Beginners",
  //     views: 1313121,
  //     uid: "44242141",
  //     channelRef: "a00c3e26-aa9b-11ed-afa1-0242ac120002",
  //     timestamp: new Date(),
  //     duration: 500,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     url: "https://www.youtube.com/watch?v=XIrOM9oP3pA",
  //     type: "programming",
  //     likes: ["a00c3e26-aa9b-11fa-afa1-0242ac120003"],
  //     comments: [
  //       {
  //         timestamp: new Date(),
  //         comment: "This is an awesome video 🙂",
  //         uid: 325532252,
  //         channelRef: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
  //         gotHeart: true,
  //         dislikes: [],
  //         likes: ["a00c3e26-aa9b-11fa-afa1-0242ac120003"],
  //         replies: [
  //           {
  //             channelRef: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
  //             reply: "This is my reply 🙂",
  //             timestamp: new Date(),
  //             likes: ["a00c3e26-aa9b-11fa-afa1-0242ac120003"],
  //             gotHeart: true,
  //           },
  //         ],
  //       },

  //       {
  //         timestamp: new Date(),
  //         comment: "Thanks",
  //         channelRef: "a00c3e26-aa9b-11ed-afa1-0242ac120002",
  //         uid: 32553252,
  //         gotHeart: true,
  //         likes: ["a00c3e26-aa9b-11fa-afa1-0242ac120003"],
  //         replies: [],
  //       },
  //     ],
  //   },
  //   {
  //     thumbnail:
  //       "https://i.ytimg.com/vi/XIrOM9oP3pA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDiN7R1akv6_cbfMTpTV_lUm1PgaQ",
  //     title: "My First Videos",
  //     views: 134343313121,
  //     uid: "449112141",
  //     channelRef: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
  //     timestamp: new Date(),
  //     duration: 800,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     url: "https://www.youtube.com/watch?v=XIrOM9oP3pA",
  //     type: "hobbies",
  //     likes: [
  //       "a00c3e26-aa9b-11ed-afa1-0242ac120002",
  //       "a00c3e26-aa9b-11fa-afa1-0242ac120003",
  //     ],
  //     dislikes: [],
  //     comments: [
  //       {
  //         timestamp: new Date(),
  //         comment: "This is an awesome video 🙂",
  //         uid: 325532252,
  //         channelRef: "a00c3e26-aa9b-11fa-afa1-0242ac120003",
  //         gotHeart: true,
  //         likes: ["a00c3e26-aa9b-11fa-afa1-0242ac120003"],
  //         replies: [],
  //       },
  //     ],
  //   },

  const Cataegories = [
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
      onClick:async  (uid, title, thumbnail,channelRef) => {
        const {data} = await supabase.from('channelInfo').select().eq('channelRef',channelRef);
        let videosUid = data[0]?.watchLater;
        if(videosUid?.includes(uid)) return;
        videosUid?.push(uid);
        await supabase.from('channelInfo').update({watchLater: videosUid}).eq('channelRef', channelRef);
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
      onClick: (uid, title, thumbnail) => {
        setShareDialog({
          videoUrl: `${process.env.NEXT_PUBLIC_URL}/watch/${uid}`,
          open: true,
          title,
          thumbnail,
        });
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
        activeSubscription,
        setActiveSubscription,
        Cataegories,
        activeCataegory,
        setActiveCataegory,
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
        videoOption,
        setVideoOption,
        shareDialog,
        setShareDialog,
        toast,
        setToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);
