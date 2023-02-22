import {
  ChatBubbleLeftEllipsisIcon,
  CloudArrowUpIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import Tooltip from "../Tooltip";

const SendFeedback = () => {
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const { setLoadingProgress, setLoading } = useStateContext();
  const { startLoadingBar, setBottomActiveSidebar } = useChannelState();

  const handleSubmit = () => {
    startLoadingBar(
      setLoading,
      setLoadingProgress,
      setInput(""),
      setBottomActiveSidebar("")
    );
  };

  return (
    <div className="shadow-lg bg-white absolute right-0 top-0 dark:bg-[#282828] p-2 px-4 rounded-xl z-[10000000000000000000] w-[400px] h-screen">
      <div className="flex items-center justify-between dark:border-b-gray-200/20 border-b-gray-600 border-b ">
        <h2 className="text-bold text-lg">Send feedback</h2>

        <Tooltip
          element={
            <XMarkIcon
              onClick={() => {
                setBottomActiveSidebar("");
              }}
              className="clickable-icon"
            />
          }
          hoverText="Close"
        />
      </div>

      <div className="flex flex-col justify-center my-4 space-y-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description your feedback
        </label>
        <textarea
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="4"
          className="block p-2.5 w-full text-sm  bg-transparent rounded-lg focus:outline-none ring-1 ring-indigo-500/40 dark:ring-indigo-400/40 dark:text-white text-neutral-900 dark:focus:ring-indigo-300 focus:ring-indigo-600 "
          placeholder="Tell us what prompted this feedback"
        />
        <span className="text-xs gap-2 flex items-center text-gray-600/60 dark:text-gray-50/80">
          Please don{`'`}t include any sensitive information{" "}
          <Tooltip
            element={<QuestionMarkCircleIcon className="icon w-8 h-8" />}
            hoverText={`Sensitive information includes passwords, card numbers, personal details.`}
            width="w-60"
          />
        </span>
      </div>

      <div className="flex items-center mr-4 click-show">
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="purple-checkbox"
          type="checkbox"
          className="cursor-pointer"
        />
        <label
          htmlFor="purple-checkbox"
          className="ml-2 text-sm text-gray-600 dark:text-gray-200 "
        >
          We may email you for more information and updates
        </label>
      </div>

      <div className="bottom-4 right-1 p-2 absolute w-full flex flex-col space-y-4">
        <div className="h-[1px] bg-gray-500/20 dark:bg-gray-200/20"></div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={input?.trim()?.length === 0}
          className="gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SendFeedback;
