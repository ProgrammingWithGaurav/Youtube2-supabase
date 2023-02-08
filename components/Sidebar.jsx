import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";

const Sidebar = () => {
  const {
    isSidebar,
    SidebarIcons,
    setLoading,
    setLoadingProgress,
    activeSidebar,
    setActiveSidebar,
    subscriptions,
    activeSubscription,
    setActiveSubscription,
  } = useStateContext();
  const router = useRouter();

  return (
    <div
      className={`${
        isSidebar ? "min-w-[200px]" : "max-w-[60px]"
      } h-screen flex flex-col p-2 scrollbar z-[100] bg-white fixed left-0 dark:bg-neutral-900 top-10 pb-10 pt-4`}
    >
      <div>
        {SidebarIcons?.map((icon) => (
          <div
            onClick={() => {
              setLoading(true);
              setLoadingProgress(90);
              setTimeout(() => {
                setLoadingProgress(100);
              }, 500);

              setTimeout(() => {
                setLoadingProgress(100);
                icon.onClick();
                setActiveSidebar(icon.name);
                setLoading(false);
              }, 700);
            }}
            className={`${
              isSidebar ? "rounded-lg" : "rounded-full"
            } flex dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200  ${
              activeSidebar === icon.name &&
              "bg-gray-100 dark:bg-white/10 dark:active:bg-white/30"
            }`}
            key={icon.name}
          >
            <span className="1/3">
              {icon.name === activeSidebar ? icon.activeIcon : icon.icon}
            </span>
            {isSidebar && (
              <span
                className={`text-sm text-gray-900 dark:text-white  ${
                  activeSidebar === icon.name &&
                  "font-semibold text-black dark:text-white"
                }`}
              >
                {icon.name}
              </span>
            )}
          </div>
        ))}
        <div className="border-b border-1 border-b-gray-300 dark:border-b-gray-600"></div>

        <div>
          {isSidebar && (
            <h2 className="dark:text-white ext-sl m-2">Subscriptions</h2>
          )}
          <div>
            {subscriptions?.map((subscription) => (
              <div
                onClick={() => {
                  setLoading(true);
                  setLoadingProgress(60);
                  setTimeout(() => {
                    setLoadingProgress(80);
                  }, 500);

                  setTimeout(() => {
                    setActiveSubscription(subscription.channelDisplayName);
                    router.push(`/${subscription.channelName}`);
                    setLoadingProgress(100);
                    setLoading(false);
                  }, 700);
                }}
                className={`${
                  isSidebar ? "rounded-lg" : "rounded-full"
                } flex dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200  ${
                  activeSubscription === subscription.channelName &&
                  "bg-gray-100 dark:bg-white/10 dark:active:bg-white/30"
                }`}
                key={subscription.channelName}
              >
                <span className="1/3">
                  <img
                    src={subscription.channelImage}
                    className="icon"
                    alt="profile picture"
                  />
                </span>
                {isSidebar && (
                  <span
                    className={`text-sm text-gray-900 dark:text-white  ${
                      activeSubscription === subscription.channelName &&
                      "font-semibold text-black dark:text-white"
                    }`}
                  >
                    {subscription.channelDisplayName}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
