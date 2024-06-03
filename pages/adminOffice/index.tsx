import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import { LoginHook } from "@/hooks/Login";
import  { HomeAdminHook }  from "@/hooks/adminOffice/home";
import React from "react";



const Child = ({ ...props }: any) => {

    const { auth, hooks }: any = props
    
    const { fromLogin, validate, setFormFiled, handleSubmit, socket } = hooks || {}
    const isValidSubmit = ( validate?.email?.success && validate?.password?.success ) || false
    console.log( { auth } );
    
    return (
        <div className="main">
        <Head>
            <title>Frut| Login</title>
            <meta property="og:title" content="Page login to" key="title" />
            <link rel="icon" href="images/signin-image.jpg" sizes="any" />
        </Head>
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <h2>THIS PAGE INDEX</h2>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    const { req} = context
    const auth =  JSON.parse( req?.headers['auth-ct5'] as string )
    return { props: { auth } }
};

  
export default function Login(props: any) {
    return ( <Child {...props} hooks={ HomeAdminHook() } /> );
}
