import React, { useEffect, useState } from 'react'
import { useChannelState } from '../../context/ChannelState';
import { supabase } from '../../SupabaseClient';
import { uid } from 'uid';

const Header = () => {

  return (
    <div className="w-full flex  items-center lg:justify-between justify-around">
      <h2 className="text-bold text-xl">Customization</h2>
    </div>
  );
}

const NewComment = (
    timestamp,
    comment,
    likes,
    gotHeart,
    channelCommented,
    channelRef,
    uid,) => {
    return (
        <div className='flex items-center justify-between'>
            <Comment timestamp={timestamp} comment={comment} gotHeart={gotHeart} likes={likes} channelCommented={channelCommented} channelRef={channelRef} uid={uid} />
        </div>
    )
}

const Comments = () => {
    const [comments, setComments] = useState([]);
    const {currentChannel} = useChannelState();
    useEffect(()  => {
        const myFunction = async () => {
            const {data: videos} = await supabase.from('videos').select().eq('channelRef', currentChannel?.uid);
            let channelVideos = [];
            videos?.map(video => video?.channelRef === currentChannel?.uid && channelVideos.push(video));
            setComments(videos);
            
        };
        myFunction();

    }, [])
  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <Header />
      <div className="grid my-3  gap-2 lg:grid-cols-3 md:grid-cols-2 lg:pr-0 pr-10 sm:grid-cols-1">
        {
            comments.length > 0 && comments?.map(comment => {
                <NewComment {...comment} key={uid()}/>
            })
        }
      </div>
    </div>
  )
}

export default Comments