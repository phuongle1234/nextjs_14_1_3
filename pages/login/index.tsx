import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AuthencationHook } from "@/hooks/Login";
import React from "react";



const Child = ({ ...props }: any) => {
 
    const { fromLogin, validate, setFormFiled, handleSubmit } = props?.hooks() || {}
    const isValidSubmit = ( validate?.email?.success && validate?.password?.success ) || false
        
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
                        <div className="signin-image">
                            <figure> <Image src="/images/signin-image.jpg" alt="sing up image" width={500} height={500} /> </figure>
                            <Link href="/register" className="signup-image-link" > Create new account </Link>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Log In</h2>
                            <form className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="email" value={fromLogin?.email}  placeholder="Your Email" onChange={setFormFiled} />
                                    { validate?.email?.error && (<span className="red">{validate?.email?.error}</span>)  }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" value={fromLogin?.password} placeholder="Password" onChange={setFormFiled} />
                                    { validate?.password?.error && (<span className="red">{validate?.password?.error}</span>)  }
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember" id="remember-me" defaultChecked={fromLogin?.remember} className="agree-term"  onClick={setFormFiled} />
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>
                                <div className="form-group form-button">
                                    <input 
                                        disabled={ !isValidSubmit }
                                        type="submit" name="signin" 
                                        id="signin" className="form-submit" value="Log in" />
                                </div>
                            </form>
                            {/* <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// export const getServerSideProps = async (context: any) => {
//     const { req} = context
//     const auth =  JSON.parse( req?.headers['auth-ct5'] as string )
//     return { props: { auth } }
//   };

  
export default function Login(props: any) {
    return ( <Child {...props} hooks={ AuthencationHook } /> );

}
