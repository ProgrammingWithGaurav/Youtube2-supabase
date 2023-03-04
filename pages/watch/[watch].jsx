import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Sidebar from "../../components/Sidebar";
import LoadingBar from "react-top-loading-bar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import VideoScreen from "../../components/Watch/VideoScreen";
import SuggestedVideos from "../../components/Watch/SuggestedVideos";
import ShareVideo from "../../components/ShareVideo";
import Toast from "../../components/Toast";
import { supabase } from "../../SupabaseClient";
import { useChannelState } from "../../context/ChannelState";

export default function Watch({ uid }) {
  const {
    shareDialog,
    appearance,
    user,
    loading,
    loadingProgress,
    setIsSidebar,
    videos,
    setActiveVideo,
    activeVideo,
    setLoading,
    setLoadingProgress,
  } = useStateContext();
  const router = useRouter();
  const {setCurrentChannel} = useChannelState();

  
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

  useEffect(() => {
    setIsSidebar(false);
    const myFunction = async () => {
    const {data: videoDetails} = await supabase.from('videos').select().eq('uid', uid)
    if (videoDetails.length === 0) router.push("/");
    else {
      setLoading(true);
      setLoadingProgress(70);
      setTimeout(() => {
        setLoadingProgress(100);
      }, 500);

      setTimeout(() => {
        setLoadingProgress(100);
        setActiveVideo(videoDetails[0]);
        setLoading(false);
      }, 700);
    }
  }
  myFunction();
  }, []);
  useEffect(() => {
    activeVideo === null && router.push("/");
  }, [activeVideo]);

  return (
    <>
      <Head>
        <title>{activeVideo?.title}</title>
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
      {activeVideo && (
        <div
          className={`flex w-full h-screen flex-col ${
            appearance === "dark" && "dark"
          }`}
        >
          <Navbar />
          {user && <Sidebar />}
          {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}

          <div className="flex lg:ml-20 ml-12 mt-4 w-[90vw] py-8 pb-20 min-h-screen overflow-x-hidden scrollbar dark:text-white">
            <VideoScreen />
            <SuggestedVideos />
          </div>
        </div>
      )}
      {shareDialog?.videoUrl !== "" && shareDialog?.open && <ShareVideo />}

      <Toast />
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { uid: context.query.watch }, // will be passed to the page component as props
  };
}
