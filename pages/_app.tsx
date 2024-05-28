import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "@/resources/provider/StoreProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (<StoreProvider><Component {...pageProps} /></StoreProvider>);
}
