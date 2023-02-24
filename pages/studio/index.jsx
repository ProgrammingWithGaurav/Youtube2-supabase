import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Sidebar from "../../components/Studio/Sidebar";
import ShareVideo from "../../components/ShareVideo";
import LoadingBar from "react-top-loading-bar";
import Toast from "../../components/Toast";
import Header from "../../components/Studio/Header";
import UploadVideo from "../../components/Studio/UploadVideo";
import { useChannelState } from "../../context/ChannelState";
import { useEffect } from "react";

// Right Side components
import Dashboard from "../../components/Studio/Dashboard";
import Content from "../../components/Studio/Content";
import Analytics from "../../components/Studio/Analytics";
import Comments from "../../components/Studio/Comments";
import Copyright from "../../components/Studio/Copyright";
import Earn from "../../components/Studio/Earn";
import Customization from "../../components/Studio/Customization";
import AudioLibrary from "../../components/Studio/AudioLibrary";
import Settings from "../../components/Studio/Settings";
import SendFeedback from "../../components/Studio/SendFeedback";
import { useRouter } from "next/router";

export default function Studio() {
  const { appearance, user, loading, loadingProgress, shareDialog } =
    useStateContext();
  const { showUpload, bottomActiveSidebar, setShowUpload } = useChannelState();
  const { query } = useRouter();

  useEffect(() => {
    if (query === undefined) return;
    query?.create && setShowUpload(true);
  }, [query]);
  return (
    <>
      <Head>
        <title>Youtube Creator Studio</title>
        <meta
          name="description"
          content="Youtube 2.0 Creator Studio for creators"
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
        <Header />
        <Sidebar />
        {showUpload && <UploadVideo />}
        {shareDialog.open && <ShareVideo />}
        {query?.dashboard && <Dashboard />}
        {query?.content && <Content />}
        {query?.anaylytics && <Analytics />}
        {query?.comments && <Comments />}
        {query?.copyright && <Copyright />}
        {query?.earn && <Earn />}
        {query?.customization && <Customization />}
        {query?.audiolibrary && <AudioLibrary />}
        {bottomActiveSidebar === "Settings" && <Settings />}
        {bottomActiveSidebar === "Send Feedback" && <SendFeedback />}
        <Toast />
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </>
  );
}
