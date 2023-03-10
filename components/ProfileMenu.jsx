import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { useChannelState } from "../context/ChannelState";

export default function ProfileMenu() {
  const { ProfileMenuIcons } = useStateContext();
  const { currentChannel } = useChannelState();

  return (
    <div>
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button>
            <img
              src={currentChannel?.channelImage || process.env.NEXT_PUBLIC_NO_IMAGE_URL}
              alt="profile picture"
              className="clickable-icon w-14 h-14"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-[1000] dark:text-white dark:bg-[#282828] shadow mt-2 w-56 origin-top-right rounded-md bg-white">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <div className="flex items-center justify-center flex-col mb-2">
                  <div className="flex items-center justify-center pr-20">
                    <img
                      src={currentChannel?.channelImage}
                      alt="profile picture"
                      className="icon w-14 h-14 hover:bg-gray-100 dark:hover:bg-white/10"
                    />
                    <span className="font-semibold text-xl">
                      {currentChannel?.channelDisplayName}
                    </span>
                  </div>
                  <Link
                    href={"/"}
                    className="font-semibold text-[14px] text-blue-500/50 hover:text-blue-500/70"
                  >
                    Manage your Account
                  </Link>
                </div>
              </Menu.Item>
              {ProfileMenuIcons?.map((icon) => (
                <Menu.Item key={icon.name}>
                  {({ active }) => (
                    <button
                      onClick={() => icon.onClick(currentChannel?.channelName)}
                      className={`${
                        active
                          ? "bg-gray-100 dark:bg-white/10"
                          : "text-gray-900"
                      } group flex dark:text-white w-full items-center rounded-md transition text-sm`}
                    >
                      {icon.icon}
                      <span>{icon.name}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
