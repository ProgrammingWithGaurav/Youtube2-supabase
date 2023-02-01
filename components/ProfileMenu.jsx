import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

export default function ProfileMenu() {
  const {ProfileMenuIcons} = useStateContext();
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <img
              src="https://avatars.githubusercontent.com/u/88154142?v=4"
              alt="profile picture"
              className="icon w-10 h-10 active:ring-2 active:ring-blue-500 p-0"
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
          <Menu.Items className="absolute right-0 shadow mt-2 w-56 origin-top-right rounded-lg dark:bg-[#282828] dark:text-white">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <div className="flex items-center justify-center flex-col mb-2">
                  <div className="flex items-center justify-center pr-20">
                    <img
                      src="https://avatars.githubusercontent.com/u/88154142?v=4"
                      alt="profile picture"
                      className="icon w-14 object-cover"
                    />
                    <span className="font-semibold text-xl">Gaurav</span>
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
                      onClick={icon.onClick}
                      className={`${
                        active ? "bg-gray-100 dark:bg-[#565656]/80" : "text-gray-900"
                      } group flex w-full items-center rounded-md dark:text-white transition text-sm opacity-70 hover:opacity-90`}
                    >
                        {icon.icon}
                      <span>
                        {icon.name}

                      </span>
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
