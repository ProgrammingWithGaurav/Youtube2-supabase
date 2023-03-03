import Navbar from "../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { useChannelState } from "../context/ChannelState";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import ChannelHeader from "../components/ChannelHeader";
import LoadingBar from "react-top-loading-bar";

// Channel
import ChannelHome from "../components/Channel/ChannelHome";
import ChannelVideos from "../components/Channel/ChannelVideos";
import ChannelShorts from "../components/Channel/ChannelShorts";
import ChannelLive from "../components/Channel/ChannelLive";
import ChannelPlaylists from "../components/Channel/ChannelPlaylists";
import ChannelCommunity from "../components/Channel/ChannelCommunity";
import ChannelChannels from "../components/Channel/ChannelChannels";
import ChannelAbout from "../components/Channel/ChannelAbout";
import { useEffect } from "react";
import ChannelStore from "../components/Channel/ChannelStore";
import { supabase } from "../SupabaseClient";

const Channel = ({ channel }) => {
  const { query } = useRouter();
  const router = useRouter();
  const {
    appearance,
    loading,
    loadingProgress,
    channelTab,
    setActiveChannel,
    activeChannel,
    setLoading,
    setLoadingProgress,
  } = useStateContext();

  useEffect(() => {
    const getData = async () => {
      const channelName = channel?.startsWith("@")
        ? channel?.slice(1, 1000)
        : channel;

      const { data: channelDetails } = await supabase
        .from("channels")
        .select()
        .eq("channelName", channelName);
      if (!channelDetails) router.push("/");
      else {
        setLoading(true);
        setLoadingProgress(70);
        setTimeout(() => {
          setLoadingProgress(100);
        }, 500);

        setTimeout(() => {
          setLoadingProgress(100);
          setActiveChannel(channelDetails[0]);

          setLoading(false);
        }, 700);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    activeChannel === null && router.push("/");
  }, [activeChannel]);

  const { currentChannel, setCurrentChannel } = useChannelState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;

      if (data?.session?.user) {
        const { data: getUserDoc } = await supabase
          .from("channels")
          .select()
          .eq("uid", user?.id)

        if (getUserDoc.length > 0) {
          setCurrentChannel(getUserDoc[0]);
        } else {
          await supabase.from("channels").insert({
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
    activeChannel && (
      <div>
        <Head>
          <title>{activeChannel?.channelDisplayName} - Youtube</title>
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
          className={`flex w-full h-auto pb-40 scrollbar flex-col ${
            appearance === "dark" && "dark"
          }`}
        >
          {currentChannel && <Sidebar />}
          <Navbar />
          <ChannelHeader />
          {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}

          <div className="w-[90vw] px-24">
            {channelTab === "Home" && <ChannelHome />}
            {channelTab === "Videos" && <ChannelVideos />}
            {channelTab === "Shorts" && <ChannelShorts />}
            {channelTab === "Live" && <ChannelLive />}
            {channelTab === "Playlists" && <ChannelPlaylists />}
            {channelTab === "Community" && <ChannelCommunity />}
            {channelTab === "Store" && <ChannelStore />}
            {channelTab === "Channels" && <ChannelChannels />}
            {channelTab === "About" && <ChannelAbout />}
          </div>
        </div>
      </div>
    )
  );
};

export default Channel;

export async function getServerSideProps(context) {
  return {
    props: { channel: context.query.channel }, // will be passed to the page component as props
  };
}
