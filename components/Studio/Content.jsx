import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import CheckBox from "../CheckBox";

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

     <div className="w-full grid my-2 gird-cols-9 gap-2">
     {activeOption === "Videos" &&
            <div className='col-span-3 bg-red-200 flex items-center gap-4'>
              <CheckBox color={'indigo'}/>
            </div>
          }
            
        </div>
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
      <div className="grid my-3  gap-2 lg:grid-cols-3 md:grid-cols-2 lg:pr-0 pr-10 sm:grid-cols-1"></div>
    </div>
  );
};

export default Content;
