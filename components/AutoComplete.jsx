import { ClockIcon } from "@heroicons/react/24/outline";

export default function AutoComplete({
  searchString,
  setSearchString,
  setInput,
  searches,
}) {
  const filteredSearches = searches?.filter((search) =>
    search
      ?.toString()
      .toLocaleLowerCase()
      .includes(searchString.toLocaleLowerCase())
  );
  return (
    <div className="flex flex-col max-h-[45vh] scrollbar overflow-x-hidden overflow-y-scroll sm:left-[15vw] lg:left-[31vw] fixed top-[10vh] cursor-default rounded-lg w-[33vw] min-w-[400px] h-auto bg-white z-[1000]">
      {filteredSearches.length >= 1 ? (
        filteredSearches?.map((search, index) => (
          <div
            key={index}
            className="flex items-center my-1 hover:bg-gray-100 transition px-2 dark:hover:bg-white/10 p-1"
          >
            <ClockIcon className="icon w-4 h-4 p-0 mr-2 dark:text-gray-900" />
            <span
              className="w-10/12 text-sm"
              onClick={() => {
                setInput(search);
                setSearchString(search);
              }}
            >
              {search}
            </span>
            <span onClick={() => {}} className="text-blue-400 text-sm">
              Remove
            </span>
          </div>
        ))
      ) : (
        <div className="flex items-center my-1 hover:bg-gray-100 transition px-2 dark:hover:bg-white/10 p-1">
          <span className="w-10/12 text-sm text-center">No search found</span>
        </div>
      )}
    </div>
  );
}
