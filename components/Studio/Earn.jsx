import React from 'react'
import { useChannelState } from '../../context/ChannelState';

const Header = () => {

  return (
    <div className="w-full flex  items-center lg:justify-between justify-around">
      <h2 className="text-bold text-xl">Earn</h2>
    </div>
  );
}

const Earn = () => {
  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <Header />
      <div className="grid my-3  gap-2 lg:grid-cols-3 md:grid-cols-2 lg:pr-0 pr-10 sm:grid-cols-1">
        {/* <ChannelAnalytics /> */}
        {/* <Ideas />   */}
      </div>
    </div>
  )
}

export default Earn