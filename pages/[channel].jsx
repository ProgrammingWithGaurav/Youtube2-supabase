import Navbar from "../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import ChannelPage from "../components/ChannelPage";

const channel = () => {
  const { query } = useRouter();
  const { appearance, user } = useStateContext();
  const { channel } = query;
  return (
    <div>
      <Head>
        <title>{channel?.slice(1, 10000)} - Youtube</title>
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
        <ChannelPage />
      </div>
    </div>
  );
};

export default channel;
