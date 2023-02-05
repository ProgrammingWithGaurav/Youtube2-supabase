import Navbar from "../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import LoadingBar from "react-top-loading-bar";

export default function Page() {
  const { appearance, user, loading, loadingProgress } = useStateContext();

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
        {user && <Sidebar />}
        <Home />
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </>
  );
}
