import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Props } from "next/script";
import NewLayout from "@/resources/layout/news";
import { HomeHook } from "@/hooks/home";

const inter = Inter({ subsets: ["latin"] });

const Child = ({ ...props } : any) => {
  
    return (
    <div>
      <p>Route Handlers allow you to create custom request handlers for a given route using the Web 
        <a href="https://developer.mozilla.org/docs/Web/API/Request" rel="noopener noreferrer nofollow" target="_blank">Request<span className="inline-flex">
          <svg className="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style={{ color: "currentcolor", width: "14px", height: "14px" }} ><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span></a> and <a href="https://developer.mozilla.org/docs/Web/API/Response" rel="noopener noreferrer nofollow" target="_blank">Response<span className="inline-flex"><svg className="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style={{ color: "currentcolor", width: "14px", height: "14px;" }}><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span></a> APIs.</p>
      <h2>Link After int: { props?.global?.backHistoryUrl || "" }</h2>

      {
        props?.global?.item?.map( (val:any) => <span key={val}>{ val } -</span> )
      }

    </div>)
}

export default function Home(props: Props) {
  const { global } = HomeHook()
  return (
   <NewLayout { ...props } title="Home: Page Test" description="this page test" >
      <Child { ...props } global={global} />
   </NewLayout>
  );
}
