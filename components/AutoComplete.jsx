import { ClockIcon } from "@heroicons/react/24/outline";

export default function AutoComplete({ searchString, setSearchString }) {
  const search = [
    "hello world",
    "programming",
    "coding",
    "learning javascript",
    "ReactJs",
  ];
  const searches = search.filter((search) =>
    search.toString().startsWith(searchString)
  );
  return (
    <div className="flex flex-col left-[31vw] fixed top-[10vh] cursor-default rounded-lg w-[33vw] min-w-300px h-auto bg-white z-[1000]">
      {searches.length >= 1 ? (
        searches?.map((search, index) => (
          <div key={index} className="flex items-center my-1 hover:bg-gray-100 transition px-2 dark:hover:bg-white/10 p-1">
            <ClockIcon className="icon w-4 h-4 p-0 mr-2 dark:text-gray-900" />
            <span
              className="w-10/12 text-sm"
              onClick={() => setSearchString(search)}
            >
              {search}
            </span>
            <span onClick={() => {
                
            }} className="text-blue-400 text-sm">Remove</span>
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
