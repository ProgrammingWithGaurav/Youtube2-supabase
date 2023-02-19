import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useChannelState } from '../../context/ChannelState';

const Dashboard = () => {
  const router = useRouter();
  const {setActiveSidebar} = useChannelState();
  const { query } = router;

  useEffect(() => {
    query?.dashboard && setActiveSidebar("Dashboard");
  }, [query]);

  return (
    <div className='flex-1 bg-red-50 h-screen w-[95vw] ml-[60px] flex items-center justify-center'>
      <h1>Hello, Channel Name You are in Dashboard</h1>
    </div>
  )
}

export default Dashboard