import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Sidebar from "../../components/Sidebar";
import LoadingBar from "react-top-loading-bar";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Watch({ uid }) {
  const {
    appearance,
    user,
    loading,
    loadingProgress,
    setIsSidebar,
    videos,
    setActiveVideo,
    activeVideo,
    setLoading,
    setLoadingProgress
  } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    setIsSidebar(false);
    const videoDetails = videos.filter((video) => video.uid === uid);
    if (videoDetails.length === 0) router.push("/");
    else {
      setLoading(true)
      setLoadingProgress(70)
      setTimeout(() => {
        setLoadingProgress(100)
      }, 500)
      
      setTimeout(() => {
        setLoadingProgress(100)
        setActiveVideo(videoDetails[0]);
        setLoading(false)
      }, 700)
    }
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
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { uid: context.query.watch }, // will be passed to the page component as props
  };
}
