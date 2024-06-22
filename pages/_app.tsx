import "@/styles/globals.css";
import "@/styles/app.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/app/css/material-kit.css?v=3.0.4"
import "@/app/css/nucleo-icons.css"
import "@/app/css/nucleo-svg.css"

import type { AppProps } from "next/app";
import { StoreProvider } from "@/resources/provider/StoreProvider";
import AccessProvide from "@/provide/access";
import Error from "@/resources/component/error";
import Loading from "@/resources/component/loading";

export default function App({ Component, pageProps }: AppProps) {  

  return (
            <StoreProvider>
              <AccessProvide>
                  <Error />
                  <Loading />
                  <Component {...pageProps} />
              </AccessProvide>
            </StoreProvider>
        );
}
