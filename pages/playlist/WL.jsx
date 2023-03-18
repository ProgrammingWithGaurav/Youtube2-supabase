import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Sidebar from "../../components/Sidebar";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import ShareVideo from "../../components/ShareVideo";
import Toast from "../../components/Toast";
import { useChannelState } from "../../context/ChannelState";
import { useEffect } from "react";
import { supabase } from "../../SupabaseClient";
import WatchLaterVideosDetails from "../../components/WatchLater/WatchLaterDetails";
import WatchLaterVideos from "../../components/WatchLater/WatchLaterVideos";

export default function WL() {
  const {
    shareDialog,
    appearance,
    user,
    videos,
    loading,
    loadingProgress,
    setLoadingProgress,
  } = useStateContext();
  const router = useRouter();

  const { fetchWatchLaterVideos, setCurrentChannel } = useChannelState();

  useEffect(() => {
    fetchWatchLaterVideos();
  }, []);

  
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (data?.session?.user) {
        const { data: getUserDoc } = await supabase
          .from("channels")
          .select()
          .eq("uid", user?.id);

        if (getUserDoc.length > 0) {
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

  return (
    <>
      <Head>
        <title>Watch Later - Youtube</title>
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
        {user && <Sidebar />}
        <div className="flex-1 h-auto scrollbar sm:h-[4000px] overflow-x-hidden p-2 pl-16 gap-4 mt-4 flex lg:flex-row flex-col ">
          <WatchLaterVideosDetails />
          <WatchLaterVideos />
        </div>
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
        {shareDialog?.videoUrl !== "" && shareDialog?.open && <ShareVideo />}
        <Toast />
      </div>
    </>
  );
}
