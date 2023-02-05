export default function Tooltip({ element, hoverText }) {
  return (
    <div className="group flex relative opacity-80 z-[100]">
      {element}
      <span
        className="group-hover:opacity-100 transition-opacity bg-gray-500 px-1 text-sm text-gray-100 rounded absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 my-6 mx-auto"
      >
        {hoverText}
      </span>
    </div>
  );
}
