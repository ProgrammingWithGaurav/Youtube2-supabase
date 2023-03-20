import React, { useEffect, useState } from "react";
import { useChannelState } from "../../context/ChannelState";
import { supabase } from "../../SupabaseClient";
import { uid } from "uid";
import Comment from "../Comment/Comment";

const Header = () => {
  return (
    <div className="w-full flex  items-center lg:justify-between justify-around">
      <h2 className="text-bold text-xl">Comments</h2>
    </div>
  );
};

const NewComment = (
  timestamp,
  comment,
  likes,
  gotHeart,
  channelRef,
  uid,
  thumbnail,
  videoUid
) => {
  const [channelDetails, setChannelDetails] = useState();
  const [videoDetails, setVideoDetails] = useState();
  const { fetchChannelDetails, fetchVideoDetails } = useChannelState();
  useEffect(() => {
    fetchChannelDetails(channelRef).then((data) => {
      setChannelDetails(data);
    });

    const fetchDetailsOfVideo = async () => {
      const details = await fetchVideoDetails(videoUid);
      setVideoDetails(details);
    };
    fetchDetailsOfVideo();
  }, []);
  return (
    <div className="flex items-center justify-between w-full">
      <Comment
        timestamp={new Date()}
        comment={comment}
        gotHeart={gotHeart}
        likes={likes}
        channelCommented={channelDetails?.channelDisplayName}
        channelRef={channelRef}
        uid={uid}
      />
      <img
        src={videoDetails?.thumbnail}
        alt="video thumbnail"
        className="w-20 h-12 rounded"
      />
    </div>
  );
};

const Comments = () => {
  const [comments, setComments] = useState();
  const { currentChannel, fetchChannelVideos } = useChannelState();

  useEffect(() => {
    const fetchComments = async () => {
      const channelVideos = await fetchChannelVideos();
      let videoUids = [];
      channelVideos?.map((video) => videoUids.push(video?.uid));
      const { data } = await supabase.from("comments").select();
      let newComments = [];
      data?.map((comment) => {
        videoUids.includes(comment?.videoUid) && newComments.push(comment);
      });
      return newComments;
    };
    fetchComments().then(data => {setComments(data); console.log(comments, data)});
  }, []);

  return (
    <div className="flex-1 h-screen mt-16 p-4 w-[95vw] ml-[60px] flex flex-col">
      <Header />
      <div className="grid my-3 gap-2 lg:grid-cols-2 md:grid-cols-1 lg:pr-0 pr-10 sm:grid-cols-1 flex-1">
        {comments?.map((comment) => (
          <NewComment key={uid()} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
