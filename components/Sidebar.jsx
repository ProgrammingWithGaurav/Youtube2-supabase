import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";

const Sidebar = () => {
  const { isSidebar, SidebarIcons, activeSidebar, setActiveSidebar,subscriptions, activeSubscription, setActiveSubscription } =
    useStateContext();
    const router = useRouter()

  return (
    <div
      className={`${
        isSidebar ? "min-w-[200px]" : "max-w-[60px]"
      } h-full flex flex-col justify-self-center p-2 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100`}
    >
      <div>
        {SidebarIcons?.map((icon) => (
          <div
            onClick={() => {
              icon.onClick();
              setActiveSidebar(icon.name);
            }}
            className={`${isSidebar ? 'rounded-lg' : 'rounded-full'} flex dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200  ${
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
              setActiveSubscription(subscription.channelDisplayName);
              router.push(`/${subscription.channelName}`)
            }}
            className={`${isSidebar ? 'rounded-lg' : 'rounded-full'} flex dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200  ${
              activeSubscription === subscription.channelName &&
              "bg-gray-100 dark:bg-white/10 dark:active:bg-white/30"
            }`}
            key={subscription.channelName}
          >
            <span className="1/3">
             <img src={subscription.channelImage} className='icon'  alt="profile picture" />
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
