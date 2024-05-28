import "@/styles/globals.css";
import "@/styles/app.scss"
import type { AppProps } from "next/app";
import { StoreProvider } from "@/resources/provider/StoreProvider";
import FiledProvide from "@/provide/field";

export default function App({ Component, pageProps }: AppProps) {  
  
  return (
            <StoreProvider>
              <FiledProvide>
                  <Component {...pageProps} />
              </FiledProvide>
            </StoreProvider>
        );
}
