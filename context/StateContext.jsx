"use client";
import { useContext, createContext, useState } from "react";

// Icons
import { ArrowLeftOnRectangleIcon, MoonIcon, PlayIcon, SunIcon, UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Switch } from '@headlessui/react'

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [appearance, setAppearance] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [enabled, setEnabled] = useState(false)

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
      name: appearance === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: appearance === 'dark' ? <SunIcon className="icon"/> : <MoonIcon className='icon' />,
      onClick: () => {
        setAppearance(appearance === 'dark' ? 'light' : 'dark')
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
export const useStateContext = () => useContext(StateContext);
