"use client";
import { useContext, createContext, useState } from "react";

// Icons
import {
  ArrowLeftOnRectangleIcon,
  MoonIcon,
  PlayIcon,
  SunIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import {UserCircleIcon as ActiveUserCircleIcon} from '@heroicons/react/24/solid';
import { useRouter } from "next/router";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [appearance, setAppearance] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState('Home');
  const [searchString, setSearchString] = useState("");

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
  ];

  const SidebarIcons = [
    {
      name: "Home",
      icon: <UserCircleIcon className="icon" />,
      icon: <ActiveUserCircleIcon className="icon" />,
      onClick: () => {
        router.push("/profile");
      },
    },
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);
