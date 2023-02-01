import Navbar from "../components/Navbar";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";

export default function Home() {
  const {appearance} = useStateContext();
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
      <div className={`${appearance === 'dark' && 'dark'}`}>
        
      <Navbar />
      </div>
    </>
  );
}
