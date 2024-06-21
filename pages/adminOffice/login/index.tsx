import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { LoginHook } from "@/hooks/Login";
import React from "react";
import LayoutAuthencation from "@/app/layout/authencation";
import { SideProps } from "@/service/sideProps";


const Child = ({ ...props }: any) => {
        
    const { fromLogin, validate, setFormFiled, handleSubmit } = props?.hooks() || {}
    const isValidSubmit = ( validate?.email?.success && validate?.password?.success ) || false
        
    return (
        <div className="card z-index-0 fadeIn3 fadeInBottom">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                    <div className="row mt-3"> </div>
                </div>
            </div>
            <div className="card-body">
                <form role="form" className="text-start" onSubmit={handleSubmit} >
                    <div className={`input-group input-group-outline my-3 ${ fromLogin?.email && "is-focused" }`}>
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" value={fromLogin?.email} onChange={setFormFiled} />
                    </div>
                    { validate?.email?.error && (<p className="small mb-2 text-danger">{validate?.email?.error}</p>)  } 
                    <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Password</label>
                        <input type="password"  name="password" className="form-control"  value={fromLogin?.password} onChange={setFormFiled}  />
                    </div>
                    { validate?.password?.error && (<p className="small mb-2 text-danger">{validate?.password?.error}</p>)  }
                    <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input name="remember" className="form-check-input" type="checkbox" id="rememberMe" defaultChecked={fromLogin?.remember} onChange={setFormFiled} />
                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <div className="text-center">
                        <button  disabled={ !isValidSubmit } type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                    </div>
                    <p className="mt-4 text-sm text-center"> Don't have an account? </p>
                </form>
            </div>
        </div>
      
    )
}

export const getServerSideProps = async (context: any) => {

    const { req } = context

    if( req?.cookies?.access_token )
        return {
            redirect: {
                permanent: false,
                destination: "/adminOffice",
            },
            props:{},
        }
    
    return { props: { } }
};;
  
export default function Login(props: any) {
    return (<LayoutAuthencation {...props} title={"Admin | Login "} >
        <Child {...props} hooks={LoginHook} />
    </LayoutAuthencation>);
}
