import React from "react";
import { ArrowTrendingUpIcon, FlagIcon } from "@heroicons/react/24/outline";
import { NumericFormat } from "react-number-format";
import { useStateContext } from "../../context/StateContext";

const ChannelAbout = () => {
  const {
    activeChannel: { joinedDate, views, description, location, socialLinks },
  } = useStateContext();

  return (
    <div className="w-full flex items-start justify-between p-4 mt-10 dark:text-white h-screen">
      <div className="w-9/12 mr-8 flex flex-col">
        <p className="font-semibold text-lg">Description</p>
        <p className="my-4">{description}</p>

        <div className="border-b border-1 w-full my-4 border-b-gray-300 dark:border-b-gray-600"></div>
        <p className="font-semibold my-4 text-lg">Details</p>

        <div className="flex flex-col space-y-4">
          <div className="flex gap-2 items-center">
            <span className="text-xs dark:text-gray-400 text-gray-600">
              For Business inquiries:
            </span>
            <button className="py-2 px-4 font-semibold text-sm dark:bg-white/10 rounded-full dark:hover:bg-white/5 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:text-white dark:active:bg-white/10 active:bg-gray-100">
              View email address
            </button>
          </div>
          <p className="flex items-center gap-20 text-xs dark:text-gray-400 text-gray-600">
            Location: <span className="text-sm">{location}</span>
          </p>
        </div>

        <div className="border-b border-1 w-full my-8 border-b-gray-300 dark:border-b-gray-600"></div>

        <div>
          <p className="font-semibold my-4 text-lg">Links</p>
          <div className="flex space-y-4 flex-wrap items-center justify-between">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                target="_blank"
                href={link?.url}
                rel="noreferrer" 
                className="w-6/12 flex items-center gap-2"
              >
                <img
                  src={link?.logo}
                  alt="social link"
                  className="icon p-0 w-4 h-4"
                />
                <span className="tex-xs text-blue-500">{link?.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <p className="font-semibold">Stats</p>
        <div className="border-b border-1 w-full border-b-gray-300 dark:border-b-gray-600"></div>

        <p className="font-semibold text-sm">
          Joined {new Date(joinedDate)?.toDateString()?.slice(4, 100000)}
        </p>
        <div className="border-b border-1 w-full border-b-gray-300 dark:border-b-gray-600"></div>

        <p className="font-semibold text-sm flex items-center">
          <ArrowTrendingUpIcon className="icon" />
          <NumericFormat
            value={views}
            allowLeadingZeros
            className="bg-transparent"
            thousandSeparator=","
            disabled={true}
          />
          <span>views</span>
        </p>
        <div className="border-b border-1 w-full border-b-gray-300 dark:border-b-gray-600"></div>

        <FlagIcon className="clickable-icon" />
      </div>
    </div>
  );
};

export default ChannelAbout;
