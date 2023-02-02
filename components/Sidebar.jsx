import { useStateContext } from "../context/StateContext";

const Sidebar = () => {
  const { isSidebar, SidebarIcons, activeSidebar, setActiveSidebar } =
    useStateContext();

  return (
    <div
      className={`${
        isSidebar ? "min-w-[200px]" : "min-w-[50px]"
      } h-full flex flex-col justify-self-center p-2 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100`}
    >
      <div>
        {SidebarIcons?.map((icon) => (
          <div
            onClick={() => {
              icon.onClick();
              setActiveSidebar(icon.name);
            }}
            className={`rounded-lg flex dark:hover:bg-white/20 items-center cursor-pointer transition my-2 hover:bg-gray-100 active:bg-gray-200  ${
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
        <div class="border-b border-1 border-b-gray-300 dark:border-b-gray-600">
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
