import { Head } from "next/document";
import React from "react";

export default function HeadComponent (props : any) {
    // { props?.title  } | { props?.detail }
    return (
    <Head>
        <title>TEST45</title>
        <meta name="description" content={ props?.description } />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
     </Head>
    )

}