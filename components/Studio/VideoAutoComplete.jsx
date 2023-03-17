import {
  ChartBarSquareIcon,
  ChatBubbleBottomCenterIcon,
  ClockIcon,
  PencilIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useRouter } from "next/router";

export default function VideoAutoComplete({
  searchString,
  setSearchString,
  channelVideos,
}) {
  const router = useRouter();
  const [filteredVideos, setFilteredVideos] = useState([]);
  const getFilteredVideos = () => {
    setFilteredVideos(
      channelVideos?.filter((video) =>
        video?.title?.toLowerCase().includes(searchString?.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getFilteredVideos();
  }, [searchString]);

  return (
    <div className="flex flex-col max-w-[45vh] scrollbar overfl0w-x-hidden overflow-y-scrolll left-2 lg:left-[28vw] fixed top-[10vh] cursor-default rounded-lg w-[55vw] min-w-[500px] h-auto bg-white dark:bg-neutral-900 z-[1000]">
      {filteredVideos?.length >= 1 ? (
        filteredVideos?.map(
          ({ title, description, timestamp, uid, thumbnail }) => (
            <div
              key={uid}
              className="cursor-pointer flex items-center my-1  border-y-[1] gap-1 border-y-gray-gray-600 dark:border-y-gray-300 hover:bg-gray-100 transition px-4 dark:hover:bg-white/10 py-2 dark:bg-neutral-900 rounded-lg"
            >
              <img
                src={thumbnail}
                alt="video thumbnail"
                className="rounded-lg object-contain w-28"
              />
              <div className="w-7/12 group">
                <p className="text-bold font-semibold text-xs">{title}</p>
                <p className="dark:text-gray-300 text-gray-900 text-xs truncate flex-1 group-hover:hidden">
                  {description}
                </p>
                <p className="hidden group-hover:flex items-center mt-2">
                  <PencilIcon
                    className="clickable-icon w-8 h-8 "
                    onClick={() =>
                      router.push(`/studio/video/${uid}?edit=true`)
                    }
                  />
                  <ChartBarSquareIcon
                    className="clickable-icon w-8 h-8 "
                    onClick={() =>
                      router.push(`/studio/video/${uid}/analytics`)
                    }
                  />
                  <ChatBubbleBottomCenterIcon
                    className="clickable-icon w-8 h-8"
                    onClick={() => router.push(`/studio/video/${uid}/comments`)}
                  />
                  <PlayIcon
                    className="clickable-icon w-8 h-8"
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/watch/${uid}`
                      )
                    }
                  />
                </p>
              </div>
              <p className="flex flex-col">
                <span className="text-bold text-[10px]">
                  {new Date(timestamp)?.toDateString()}
                </span>
                <span className="text-[10px] dark:text-gray-300 text-gray-900">
                  Published
                </span>
              </p>
            </div>
          )
        )
      ) : (
        <div className="flex items-center my-1 hover:bg-gray-100 transition px-2 dark:hover:bg-white/10 p-1">
          <span className="w-10/12 text-sm text-center">Videos (0)</span>
        </div>
      )}
    </div>
  );
}
