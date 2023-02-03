import TimeAgo from "javascript-time-ago";
import { useRouter } from "next/router";

export default function Video({ duration, thumbnail, timestamp, channelImage, title,views, channelName, channelDisplayName }) {
    const router = useRouter();
    const timeAgo = new TimeAgo('en-US')
  return (
    <div className=" cursor-pointer w-full h-64 hover:scale-105 transition">
      <div className="relative">
        <img
          src={thumbnail}
          className="rounded-xl object-cover"
          alt="video thumbnail"
        />
        <span className="absolute text-white bg-neutral-900/80 bottom-2 right-2 rounded-lg px-2 py-1 text-xs font-semibold">
          {duration}
        </span>
      </div>
      <div className="p-1 px-0">
        <h4 className="text-gray-900 dark:text-white font-bold truncate flex">
          <img
            onClick={() => router.push(`/${channelName}`)}
            src={channelImage}
            alt="Channel Profile Picture"
            className="w-10 h-10 rounded-full mt-4"
          />
          <div className="flex-1 p-2">
            <span className="w-full ">
              {title.length > 27 ? title.slice(0, 27) : title}
            </span>
            <br />
            <span className="w-full ">
              {title.length > 27 && `${title.slice(27, 1000)}`}
            </span>
            <br />
            <span className="dark:text-gray-600 text-sm font-normal hover:text-gray-800 dark:hover:text-gray-200" onClick={() => router.push(`/${channelName}`)}>{channelDisplayName}</span>
            <br />
            <span className="dark:text-gray-400 text-sm font-normal" onClick={() => router.push(`/${channelName}`)}>{views} • {timeAgo.format(timestamp)}</span>
          </div>
        </h4>
      </div>
    </div>
  );
}
