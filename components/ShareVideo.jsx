import { Dialog, Transition } from "@headlessui/react";
import { ClipboardIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useStateContext } from "../context/StateContext";

export default function ShareVideo() {
  const { shareDialog, setShareDialog, appearance, setToast, toast } =
    useStateContext();

  const ShareIcons = [
    {
      name: "Embed",
      image: "https://cdn-icons-png.flaticon.com/128/711/711284.png",
      onClick: (videoUrl) => {
        navigator.clipboard.writeText(
          `<iframe width="560" height="315" src=${videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        );
        setToast({
          text: "Embed copied to cliboard",
          icon: <CodeBracketIcon />,
          color: "red",
          open: true,
        });
        setTimeout(() => {
          setToast({
            ...toast,
            open: false,
          });
        }, 3000);
      },
    },
    {
      name: "Reddit",
      image: "https://cdn-icons-png.flaticon.com/128/3670/3670226.png",
      onClick: (videoUrl) => {
        window.open(`
        https://www.reddit.com/submit?url=https%3A//${
          videoUrl.split("/")[2]
        }/watch%${videoUrl.split("/")[4]}&title=Check_Out_This_Video`);
      },
    },
    {
      name: "WhatsApp",
      image: "https://cdn-icons-png.flaticon.com/128/2504/2504845.png",
      onClick: (videoUrl) => {
        window.open(`
        https://api.whatsapp.com/send/?text=https%3A%2F%2F${
          videoUrl.split("/")[2]
        }%2${videoUrl.split("/")[4]}&app_absent=0
        
        `);
      },
    },
    {
      name: "Facebook",
      image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
      onClick: (videoUrl) => {
        window.open(`
        https://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A//${
          videoUrl.split("/")[2]
        }/watch%3Fv%3D_6Zhfts2iao%26feature%3Dshare&display=popup
        `);
      },
    },
    {
      name: "Twitter",
      image: "https://cdn-icons-png.flaticon.com/128/3670/3670151.png",
      onClick: (videoUrl) => {
        window.open(`
        https://twitter.com/intent/tweet?url=https%3A//${
          videoUrl.split("/")[2]
        }/${
          videoUrl.split("/")[4]
        }&text=Check_Out_This_Video&via=YouTube&related=YouTube
        `);
      },
    },

    {
      name: "Gmail",
      image: "https://cdn-icons-png.flaticon.com/128/732/732200.png",
      onClick: (videoUrl) => {
        window.open(`
        https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&su=example&body=${videoUrl}
        `);
      },
    },
    {
      name: "Pinterest",
      image: "https://cdn-icons-png.flaticon.com/128/2504/2504932.png",
      onClick: (videoUrl, title, thumbnail) => {
        window.open(`
        https://in.pinterest.com/pin/create/button/?description=${title}&is_video=true&media=${thumbnail}&url=${videoUrl}%3Dshare
        `);
      },
    },

    {
      name: "Blogger",
      image: "https://cdn-icons-png.flaticon.com/128/3291/3291662.png",
    },

    {
      name: "Tumblr",
      image: "https://cdn-icons-png.flaticon.com/128/3536/3536602.png",
      onClick: (videoUrl) => {
        window.open(`
        https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=${videoUrl}%3Dshare&posttype=video&content=${videourl}
        `);
      },
    },

    {
      name: "LinkedIn",
      image: "https://cdn-icons-png.flaticon.com/128/3536/3536505.png",
    },
  ];

  return (
    <>
      <Transition appear show={shareDialog?.open} as={Fragment}>
        <Dialog
          as="div"
          className="absolute z-[100000000000]"
          onClose={() =>
            setShareDialog({
              videoUrl: "",
              open: false,
              title: "",
              thumbnail: "",
            })
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full max-w-md transform overflow-hidden rounded-2xl ${
                    appearance === "dark"
                      ? "bg-neutral-900 text-white"
                      : "bg-white"
                  } p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-medium leading-6 ${
                      appearance === "dark" && "text-white"
                    }`}
                  >
                    Share
                  </Dialog.Title>
                  <div className="flex flex-col">
                    <div className="mt-2 flex items-center scrollbar space-x-4">
                      {ShareIcons?.map((icon) => (
                        <div
                          key={icon.name}
                          className="flex flex-col "
                          onClick={() => {
                            icon.onClick(
                              shareDialog?.videoUrl,
                              shareDialog?.title,
                              shareDialog?.thumbnail
                            );
                          }}
                        >
                          <a href={"#hi"} rel="">
                            <img
                              src={icon.image}
                              alt={`Social Icon ${icon.name}`}
                              className={`p-2 ${
                                appearance === "dark"
                                  ? "hover:bg-white/5 active:bg-white/20"
                                  : "hover:bg-gray-100 active:bg-gray-200"
                              } active:scale-105 transform cursor-pointer rounded-full w-16 h-16 object-contain text-xs`}
                            />
                          </a>
                          <span className="dark:text-white text-xs text-center">
                            {icon.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2  rounded-xl flex items-center dark:bg-black my-4 ring-1 ring-gray-500 dark:ring-gray-400">
                      <span className="truncate">{shareDialog?.videoUrl}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareDialog?.videoUrl);
                          setToast({
                            text: "Text copied to cliboard",
                            icon: <ClipboardIcon />,
                            color: "blue",
                            open: true,
                          });
                          setTimeout(() => {
                            setToast({
                              ...toast,
                              open: false,
                            });
                          }, 3000);
                        }}
                        className="p-2 rounded-full cursor-pointer hover:opacity-90 px-4 text-sm active:opacity-100 bg-blue-500 dark:text-blue-900"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
