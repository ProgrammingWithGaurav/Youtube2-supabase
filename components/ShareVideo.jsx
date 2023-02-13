import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ShareIcons = [
  {
    name: "Embed",
    image: "https://cdn-icons-png.flaticon.com/128/711/711284.png",
  },
  {
    name: "Reddit",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670226.png",
  },
  {
    name: "WhatsApp",
    image: "https://cdn-icons-png.flaticon.com/128/2504/2504845.png",
  },
  {
    name: "Facebook",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },
  {
    name: "Twitter",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },

  {
    name: "Gmail",
    image: "https://cdn-icons-png.flaticon.com/128/732/732200.png",
  },
  {
    name: "KakaoTalk",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },
  {
    name: "VK",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },

  {
    name: "OK",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },

  {
    name: "Pinterest",
    image: "https://cdn-icons-png.flaticon.com/128/2504/2504932.png",
  },

  {
    name: "Blogger",
    image: "https://cdn-icons-png.flaticon.com/128/3291/3291662.png",
  },

  {
    name: "Tumblr",
    image: "https://cdn-icons-png.flaticon.com/128/3536/3536602.png",
  },

  {
    name: "LinkedIn",
    image: "https://cdn-icons-png.flaticon.com/128/3536/3536505.png",
  },
  {
    name: "Skyrock",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },
  {
    name: "Mix",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },
  {
    name: "goo",
    image: "https://cdn-icons-png.flaticon.com/128/3670/3670032.png",
  },
];

export default function ShareVideo() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="absolute z-[100000000000]"
          onClose={closeModal}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
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
