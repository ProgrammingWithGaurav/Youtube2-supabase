import Navbar from "../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import ShareVideo from "../components/ShareVideo";
import LoadingBar from "react-top-loading-bar";
import Toast from "../components/Toast";
import { useChannelState } from "../context/ChannelState";
import { useEffect } from "react";
import { supabase } from "../SupabaseClient";

export default function Page() {
  const { appearance, loading, loadingProgress, shareDialog } =
    useStateContext();
    const {currentChannel, setCurrentChannel} = useChannelState();

    useEffect(() => {
      const getData = async () => {
        const {data} = await supabase.auth.getSession();
        const user = data?.session?.user;
        
        if(data?.session?.user) {
          const {data} = await supabase.from('channels').upsert(
            {
              channelName: user?.user_metadata?.name,
              channelImage: user?.user_metadata?.avatar_url,
              channelBannerImage: "",
              subscribers: 0,
              uid: user?.id,
              channelDisplayName: user?.user_metadata?.full_name,
              socialLinks: [],
              views: 0,
              joinedDate: user?.created_at,
              description: ``,
              location: "",
              subscriptions: [],
              email: user?.user_metadata?.email,
              playlists: [],
              channelSearches: [],
              store: [],
            }
          ).select()
          setCurrentChannel(data[0])
        } else {
          setCurrentChannel(null);
        }
  
      }
      getData()
    }, )
  return (
    <>
      <Head>
        <title>Youtube</title>
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
        <Home />
        {shareDialog.open && <ShareVideo />}
        <Toast />
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </>
  );
}
