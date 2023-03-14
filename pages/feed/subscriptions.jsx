import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Home from "../../components/Home";
import Sidebar from "../../components/Sidebar";
import ShareVideo from "../../components/ShareVideo";
import LoadingBar from "react-top-loading-bar";
import Toast from "../../components/Toast";
import { useChannelState } from "../../context/ChannelState";
import { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import Video from "../../components/Video";
import Masonry from "react-masonry-css";

export default function Page() {
  const [subscriptionsFeed, setSubscriptionsFeed] = useState([]);
  const {
    appearance,
    loading,
    loadingProgress,
    shareDialog,
    setVideos,
    videos,
  } = useStateContext();
  const { currentChannel, setCurrentChannel } = useChannelState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (data?.session?.user) {
        const { data: getUserDoc } = await supabase
          .from("channels")
          .select()
          .eq("uid", user?.id);

        if (getUserDoc?.length > 0) {
          setCurrentChannel(getUserDoc[0]);
        } else {
          const { data: newUserDoc } = await supabase.from("channels").insert({
            uid: user?.id,
            timestamp: new Date(),
            channelName: user?.user_metadata?.name,
            channelDisplayName: user?.user_metadata?.full_name,
            channelImage: user?.user_metadata?.avatar_url,
          });
          window.location.reload();
        }
      } else {
        setCurrentChannel(null);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const GetVideos = async () => {
    const newVideos = [];
      let currentSubscriptions = [];
      const { data: channels } = await supabase.from("channelInfo").select();
      console.log(channels)
      channels.map(
        (channel) =>
        channel?.subscribers?.includes(currentChannel?.uid) &&
          currentSubscriptions.push(channel?.channelRef)
      );
      const { data: videos } = await supabase.from("videos").select();

      videos.map((video) =>
      currentSubscriptions?.includes(video?.channelRef) && newVideos.push(video)
        );

        setSubscriptionsFeed(newVideos);
    };
    GetVideos();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <>
      <Head>
        <title>Subscriptions - Youtube</title>
        <meta
          name="description"
          content="Youtube 2.0 with Nextjs and Supabase"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
        />
      </Head>
      <div
        className={`flex w-full h-screen flex-col ${
          appearance === "dark" && "dark"
        }`}
      >
        <Navbar />
        {currentChannel && <Sidebar />}
        
        
    <div className="flex-1">
        <div className='flex-1 pl-20 h-full flex mt-20'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4 flex-wrap"
          columnClassName="my-masonry-grid_column"
        >
          {subscriptionsFeed?.map((video) => (
            <Video key={video?.uid} {...video} />
          ))}
        </Masonry>
        </div>
        </div>
        {shareDialog.open && <ShareVideo />}
        <Toast />
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </>
  );
}
