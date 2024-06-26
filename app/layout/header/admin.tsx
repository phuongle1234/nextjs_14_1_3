"use client";
import { AccessContext } from "@/provide/access"
import React from "react"
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderAdmin = ({ children, ...props } : any) => {
    
    const router = useRouter()
    const {  asPath } = router

    const pages = asPath.split("/")
     
    const auth = props?.auth || {}
    
    const handleLogOut = (e:any) => {
        try {
            deleteCookie("access_token")
            window.location.reload();
        } catch (error) {
            console.log( { error } );            
        }
    }

    return (
        <div className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
        <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">

                    {
                        (pages?.length > 3) && (
                            <li className="text-sm">
                                <span className="text-dark" onClick={()=> { return router.back() }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                    </svg>
                                </span>
                            </li>
                        )
                    }
                    
                    <li className="breadcrumb-item text-sm">
                        <Link href={`/adminOffice`} className="opacity-5 text-dark" >Home</Link>
                    </li>
                    {
                        pages.filter( (res: any) => !['',"adminOffice"].includes(res as string) )
                             .map( (val:any) => (<li key={`ids-${val}`} className={`breadcrumb-item text-sm text-dark`} >
                                                    <Link className={`${val == pages[ pages.length - 1 ] ? "active" : "opacity-5" }`} href={( (page: any)=> (asPath.substring(0, ( asPath.search(page) ) +page.length ) ) )(val)} >  {val} </Link> 
                                                </li>) )
                    }
                </ol>
                {/* <h6 className="font-weight-bolder mb-0">Tables</h6> */}
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    {/* <div className="input-group input-group-outline">
                        <label className="form-label">Type here...</label>
                        <input type="text" className="form-control" />
                    </div> */}
                </div>
                <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center">
                        <span className="text-primary mb-0 me-3" >
                           { auth?.name }
                        </span>
                    </li>
                    <li className="mt-2">
                        {/* <a className="github-button" href="https://github.com/creativetimofficial/material-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/material-dashboard on GitHub">Star</a> */}
                    </li>
                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a  className="nav-link text-body p-0" id="iconNavbarSidenav">
                            <div className="sidenav-toggler-inner">
                                <i className="sidenav-toggler-line"></i>
                                <i className="sidenav-toggler-line"></i>
                                <i className="sidenav-toggler-line"></i>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item px-3 d-flex align-items-center">
                        <a  className="nav-link text-body p-0">
                            <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                        <a  className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-bell cursor-pointer"></i>
                        </a>
                    </li>
                    <li className="nav-item d-flex align-items-center">
                        <span>
                            <i className="fa fa-user me-sm-1"></i>
                            <a className="d-sm-inline d-none" onClick={handleLogOut} >Log Out</a>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default HeaderAdmin