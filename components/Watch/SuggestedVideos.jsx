import React from "react";

const SuggestedVideos = ({cateogry}) => {
  return (
    <div className="lg:w-full w-0 p-2 py-4 flex flex-col">
      <span
        className={`p-2 rounded-xl text-xs cursor-pointer bg-neutral-900 transition 
               dark:bg-white text-white dark:text-neutral-700
          `}
      >
        {cateogry}
      </span>

      <div className='flex items-center space-x-2'>
            <img src={''} alt="video Thubmnail" />
      </div>
    </div>
  );
};

export default SuggestedVideos;
