import "regenerator-runtime/runtime";
import StateProvider from "../context/StateContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <div className="w-full h-screen">
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </StateProvider>
  );
}
