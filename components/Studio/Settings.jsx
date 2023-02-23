import {
  ChatBubbleLeftEllipsisIcon,
  CloudArrowUpIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { useChannelState } from "../../context/ChannelState";
import { useStateContext } from "../../context/StateContext";
import Tooltip from "../Tooltip";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import currencies from "../data/Currencies";

function CurrenciesBox() {
  console.log(currencies)

  const [selected, setSelected] = useState(currencies[0]);
  const handleUpdate = () => {};

  useEffect(() => {
    handleUpdate();
  }, [selected]);

  return (
    <div className="my-2">
      <Listbox value={selected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-60 rounded-lg cursor-pointer bg-white dark:bg-neutral-900 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.code} - {selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white dark:bg-neutral-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {currencies.map((currency) => (
                <Listbox.Option
                onClick={() => setSelected(currency)}
                  key={currency?.code}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 dark:text-white pr-4 ${
                      active
                        ? "bg-amber-100 dark:bg-neutral-800 text-amber-900"
                        : "text-gray-900"
                    }`
                  }
                  value={currency?.code}
                >
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {currency?.name}
                      </span>
                      {currency?.name === selected?.name ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

const GeneralSetting = () => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="flex item-center gap-1 text-bold">
        Default units{" "}
        <Tooltip
          width={"w-60"}
          element={
            <QuestionMarkCircleIcon className="dark:text-gray-400 text-gray-700 w-5 h-5" />
          }
          hoverText={`Choose the currency unit for youtube studio`}
        />
      </h3>
      <span className="text-gray text-sm click-show">Currency</span>
      <CurrenciesBox />
    </div>
  );
};

const ChannelSetting = () => {
  return (
    <div className="bg-gray-50 p-4 dark:bg-white/10 rounded flex flex-col">
      <h3 className="flex item-center gap-1">
        Default units{" "}
        <Tooltip
          element={
            <QuestionMarkCircleIcon className="dark:text-gray-200 text-gray-600" />
          }
          hoverText={`Choose the currency unit for youtube studio`}
        />
      </h3>
    </div>
  );
};

const UploadDefaults = () => {
  return (
    <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">
      UploadDefaults
    </div>
  );
};

const Permissions = () => {
  return (
    <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">Permissions</div>
  );
};

const Community = () => {
  return (
    <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">Community</div>
  );
};

const Agreements = () => {
  return (
    <div className="bg-gray-50 p-4 dark:bg-white/10 rounded ">
      Use all the features by following the Guidlines.  
<span className='link-btn' onClick={() => {}}>Learn more</span>
    </div>
  );
};

const Settings = () => {
  const videoRef = useRef(null);
  const router = useRouter();
  const { query } = router;
  const { setLoading, setLoadingProgress } = useStateContext();
  const [setting, setSetting] = useState("General");
  const { setBottomActiveSidebar, startLoadingBar, GetUid } = useChannelState();

  const Settings = [
    "General",
    "Channel",
    "Upload Defaults",
    "Permissions",
    "Community",
    "Agreements",
  ];

  return (
    <div className="w-screen h-screen lg:top-2 top-16 flex items-center fixed justify-center z-[10000000000000000000]">
      <div className="shadow-lg bg-white dark:bg-[#282828] p-2 px-4 rounded-xl lg:w-[60vw] w-[400px] h-[600px]">
        <div className="flex items-center justify-between dark:border-b-gray-200/20 border-b-gray-600 border-b ">
          <h2 className="text-bold text-lg">Settings</h2>

          <div className="flex item-scenter gap-1">
            <Tooltip
              element={
                <ChatBubbleLeftEllipsisIcon
                  onClick={() =>
                    startLoadingBar(setLoading, setLoadingProgress, () =>
                      setBottomActiveSidebar("Send Feedback")
                    )
                  }
                  className="clickable-icon"
                />
              }
              width={"w-24"}
              hoverText="Send Feedback"
            />
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
        </div>

        <div className="flex my-1">
          <div className="flex flex-col justify-center border-r h-full pr-4 dark:border-r-gray-100/10 border-r-gray-600/10 text-neutral-900 dark:text-white">
            {Settings.map((settingOption) => (
              <div
                key={GetUid()}
                onClick={() => setSetting(settingOption)}
                className={`click-show cursor-pointer py-3 text-sm font-medium px-2 pr-6 rounded transition ${
                  setting === settingOption
                    ? "dark:bg-neutral-900 bg-gray-200"
                    : "dark:hover:bg-stone-900 hover:bg-gray-100"
                }`}
              >
                {settingOption}
              </div>
            ))}
          </div>
          <div className="flex-1 h-full p-4 dark:text-white">
            {setting === "General" && <GeneralSetting />}
            {setting === "Channel" && <ChannelSetting />}
            {setting === "Upload Defaults" && <UploadDefaults />}
            {setting === "Permissions" && <Permissions />}
            {setting === "Community" && <Community />}
            {setting === "Agreements" && <Agreements />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
