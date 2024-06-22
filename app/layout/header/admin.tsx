"use client";
import { AccessContext } from "@/provide/access"
import React from "react"
import { deleteCookie } from "cookies-next";

const HeaderAdmin = ({ children, ...props } : any) => {
     
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
                    <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                    <li className="breadcrumb-item text-sm text-dark active" >{props?.prefix}</li>
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
                        <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                            <div className="sidenav-toggler-inner">
                                <i className="sidenav-toggler-line"></i>
                                <i className="sidenav-toggler-line"></i>
                                <i className="sidenav-toggler-line"></i>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item px-3 d-flex align-items-center">
                        <a href="javascript:;" className="nav-link text-body p-0">
                            <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                        <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
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