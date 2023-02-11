export default function Tooltip({ element, hoverText, width }) {
  return (
    <div className="group flex relative opacity-80 z-[100]">
      {element}
      <span
        className={`group-hover:opacity-100 text-xs transition-opacity bg-gray-500 px-1 text-gray-100 rounded absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 py-1 my-6 mx-auto text-center ${width}`}
      >
        {hoverText}
      </span>
    </div>
  );
}
