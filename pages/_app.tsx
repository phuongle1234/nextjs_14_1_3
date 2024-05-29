import "@/styles/globals.css";
import "@/styles/app.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from "next/app";
import { StoreProvider } from "@/resources/provider/StoreProvider";
import FiledProvide from "@/provide/field";
import Error from "@/resources/component/error";
import Loading from "@/resources/component/loading";

export default function App({ Component, pageProps }: AppProps) {  
  
  return (
            <StoreProvider>
              <FiledProvide>
                  <Error />
                  <Loading />
                  <Component {...pageProps} />
              </FiledProvide>
            </StoreProvider>
        );
}
