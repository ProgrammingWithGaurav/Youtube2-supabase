import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../../context/StateContext";
import Home from "../../components/Home";
import Sidebar from "../../components/Studio/Sidebar";
import ShareVideo from "../../components/ShareVideo";
import LoadingBar from "react-top-loading-bar";
import Toast from "../../components/Toast";
import Header from "../../components/Studio/Header";

export default function Studio({query}) {
  const { appearance, user, loading, loadingProgress, shareDialog } =
    useStateContext();
  console.log(query);
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
        <div>
          
        </div>
        {shareDialog.open && <ShareVideo />}
        <Toast />
        {loading && <LoadingBar color="#f11946" progress={loadingProgress} />}
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  return {
    props: { query: context.query }, // will be passed to the page component as props
  };
}

