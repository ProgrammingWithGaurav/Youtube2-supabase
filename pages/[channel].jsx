import Navbar from "../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import ChannelHeader from "../components/ChannelHeader";
import LoadingBar from "react-top-loading-bar";

const Channel = () => {
  const { query } = useRouter();
  const { appearance, user, loading, loadingProgress } = useStateContext();
  const { Channel } = query;
  return (
    <div>
      <Head>
        <title>{Channel?.slice(1, 10000)} - Youtube</title>
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
        {user && <Sidebar />}
        <Navbar />
        <ChannelHeader />
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </div>
  );
};

export default Channel;
