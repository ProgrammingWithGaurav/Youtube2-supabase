import Head from "next/head";
import { useStateContext } from "../../../../context/StateContext";
import Sidebar from "../../../../components/Studio/Video/Sidebar";
import ShareVideo from "../../../../components/ShareVideo";
import LoadingBar from "react-top-loading-bar";
import Toast from "../../../../components/Toast";
import Header from "../../../../components/Studio/Header";
import UploadVideo from "../../../../components/Studio/UploadVideo";
import { useChannelState } from "../../../../context/ChannelState";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SendFeedback from "../../../../components/Studio/SendFeedback";
import Settings from "../../../../components/Studio/Settings";

import Edit from '../../../../components/Studio/Video/Edit';
import Analytics from '../../../../components/Studio/Video/Analytics';
import Editor from '../../../../components/Studio/Video/Editor';
import Comments from '../../../../components/Studio/Video/Comments';
import Copyright from '../../../../components/Studio/Copyright';
import Earn from "../../../../components/Studio/Earn";

export default function VideoDetail() {
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
        <title>Video Details - Youtube Studio</title>
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
        <Toast />

        {query?.edit && <Edit />}
        {query?.editor && <Editor />}
        {query?.copyright && <Copyright />}
        {query?.editor && <Editor />}
        {query?.analytics && <Analytics />}
        {query?.comments && <Comments />}
        {query?.Earn && <Earn />}
        
        {bottomActiveSidebar === "Settings" && <Settings />}
        {bottomActiveSidebar === "Send Feedback" && <SendFeedback />}
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </>
  );
}
