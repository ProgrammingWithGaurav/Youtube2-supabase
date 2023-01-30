import Navbar from "../components/Navbar";
import StateProvider from "../context/StateContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-full h-screen ">
      <StateProvider>
        <Navbar />
        <div>
          <Component {...pageProps} />
        </div>
      </StateProvider>
    </div>
  );
}
