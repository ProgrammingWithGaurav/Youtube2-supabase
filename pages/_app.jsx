import "regenerator-runtime/runtime";
import StateProvider from "../context/StateContext";
import "../styles/globals.css";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)


export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
          <Component {...pageProps} />
    </StateProvider>
  );
}
