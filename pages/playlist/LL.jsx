import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Sidebar from "../../components/Sidebar";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import ShareVideo from "../../components/ShareVideo";
import Toast from "../../components/Toast";
import LikedVideosDetails from "../../components/LikedVideos/LikedVideosDetails";
import LikedVideos from "../../components/LikedVideos/LikedVideos";
import { useChannelState } from "../../context/ChannelState";
import { useEffect } from "react";

export default function LL() {
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

  const { fetchLikedVideos } = useChannelState();

  useEffect(() => {
    fetchLikedVideos(videos);
  }, []);

  return (
    <>
      <Head>
        <title>Liked Videos - Youtube</title>
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
        <div className="flex-1 h-auto scrollbar sm:h-[4000px] p-2 pl-16 gap-4 mt-4 flex lg:flex-row sm:flex-col">
          <LikedVideosDetails />
          <LikedVideos />
        </div>
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
        {shareDialog?.videoUrl !== "" && shareDialog?.open && <ShareVideo />}
        <Toast />
      </div>
    </>
  );
}
