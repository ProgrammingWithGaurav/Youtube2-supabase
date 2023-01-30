import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { useStateContext } from "../context/StateContext";
import ProfileMenu from "./ProfileMenu";
import Tooltip from "./Tooltip";

const Header = () => {
  const { isSidebar, setIsSidebar, appearance, searchString, setSearchString } =
    useStateContext();
  const [hasFocused, setHasFocused] = useState(false);
  return (
    <div className="flex items-center justify-between w-full h-[10vh] p-2">
      <div className="flex items-center">
        {isSidebar ? (
          <XMarkIcon className="icon" onClick={() => setIsSidebar(false)} />
        ) : (
          <Bars3Icon className="icon" onClick={() => setIsSidebar(true)} />
        )}
        <Link
          href="/"
          className="cursor-pointer icon w-12 h-12 items-center flex gap-1"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
            alt="logo"
          />
          <span className="hidden lg:block font-bold dark:text-white text-xl text-black tracking-[-2px] leading-6">
            YouTube
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        <div
          className={`border items-center lg:w-[33vw] sm:w-[50vw] flex border-gray-300 rounded-full p-1 shadow-inner ${
            hasFocused && "ring-blue-400 ring-1"
          }`}
          onBlur={() => setHasFocused(false)}
        >
          <input
            type="search"
            className="flex-1 focus:outline-none text-sm px-4"
            placeholder="Search"
            onFocus={() => setHasFocused(true)}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <Tooltip
            element={
              <MagnifyingGlassIcon
                onClick={() => console.log("hi")}
                className="icon w-6 h-6 p-1"
              />
            }
            hoverText="Search"
          />
        </div>

        <Tooltip
          element={<MicrophoneIcon className="icon w-6 h-6 p-1" />}
          hoverText="Search with your voice"
        />
      </div>
      <div className="flex items-center">
        <Tooltip
          element={<VideoCameraIcon className="icon" />}
          hoverText="Create"
        />
        <Tooltip
          element={<BellIcon className="icon" />}
          hoverText="Notifications"
        />
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
