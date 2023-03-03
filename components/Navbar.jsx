import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { useStateContext } from "../context/StateContext";
import ProfileMenu from "./ProfileMenu";
import Tooltip from "./Tooltip";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import AutoComplete from "./AutoComplete";
import { useRouter } from "next/router";
import { useChannelState } from "../context/ChannelState";
import { supabase } from "../SupabaseClient";

const Header = () => {
  const { isSidebar, setIsSidebar, searchString, setSearchString, setLoading, setLoadingProgress } =
    useStateContext();
  const { channelSearches, currentChannel, handleLogin , startLoadingBar} = useChannelState();
  const [hasFocused, setHasFocused] = useState(false);
  const [input, setInput] = useState(searchString);
  const router = useRouter();

  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setSearchString(transcript);
    SpeechRecognition.stopListening();
  }, [transcript]);

  const handleSearch = async () => {
    setSearchString(input);
    const {data} =await supabase.from('searches').select()
    const searches = data[0].searches
    const matchSearches = searches.filter(search => search.toLowerCase() === searchString?.toLowerCase())
    console.log(matchSearches)
    if(matchSearches.length > 0 ){ 

    } else {
      const newSearches = [...searches, input]
      console.log(newSearches)
      await supabase.from('searches').update({searches: [...searches]}).eq('channelRef', currentChannel?.uid)
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-full h-[10vh] fixed top-0 z-[10000] bg-white dark:bg-neutral-900 p-2`}
    >
      <div className="flex items-center">
        {currentChannel &&
          (isSidebar ? (
            <XMarkIcon className="icon" onClick={() => setIsSidebar(false)} />
          ) : (
            <Bars3Icon className="icon" onClick={() => setIsSidebar(true)} />
          ))}
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
          className={`border items-center lg:w-[33vw] sm:w-[50vw] flex border-gray-300 dark:border-gray-700 rounded-full p-1 shadow-inner ${
            hasFocused && "ring-indigo-700 ring-1"
          }`}
          onBlur={() =>
            setTimeout(() => {
              setHasFocused(false);
            }, 200)
          }
        >
          <input
            type="search"
            className="flex-1 focus:outline-none text-sm px-4 bg-transparent dark:text-gray-100"
            placeholder="Search"
            onFocus={() => setHasFocused(true)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>
            {hasFocused && (
              <AutoComplete
                searches={channelSearches}
                searchString={input}
                setSearchString={setSearchString}
                setInput={setInput}
              />
            )}
          </div>
          <Tooltip
            element={
              <MagnifyingGlassIcon
                onClick={() => handleSearch()}
                className="clickable-icon w-6 h-6 p-1"
              />
            }
            hoverText="Search"
          />
        </div>

        <Tooltip
          element={
            <MicrophoneIcon
              onClick={() =>
                listening
                  ? SpeechRecognition.stopListening()
                  : SpeechRecognition.startListening()
              }
              className={`clickable-icon ${
                listening && "text-blue-400 shadow-lg"
              } w-6 h-6 p-1 dark:bg-white/10 dark:hover:bg-white/20`}
            />
          }
          hoverText="Search with your voice"
          width="w-40"
        />
      </div>
      <div className="flex items-center">
        <Tooltip
          element={
            <VideoCameraIcon
              onClick={() => router.push("/studio?create=true")}
              className="clickable-icon"
            />
          }
          hoverText="Create"
        />
        <Tooltip
          element={<BellIcon className="clickable-icon" />}
          hoverText="Notifications"
        />
        {currentChannel ? (
          <ProfileMenu />
        ) : (
          <button
            type="button"
            onClick={() => startLoadingBar(setLoading, setLoadingProgress, () => handleLogin())}
            className="text-red-400 hover:text-white border border-red-400 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center mr-2"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
