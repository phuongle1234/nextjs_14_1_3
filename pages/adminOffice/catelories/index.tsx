import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SideProps } from "@/service/sideProps";
import LayoutAdmin from "@/app/layout/admin";
import { CateloriesHook } from "@/hooks/Catelories";
import debounce from "debounce";

const Child = ({ ...props }: any) => {

    const { handleChangeKeyWord, handleLoadMore, items, fields }: any = props?.hoock()
    
    const [ subTag, setSubTag ]: any = React.useState <any> ([])


    const handleToggerSub = (e: any) => {
        const subId = Number( e.target.getAttribute("data-sub") || 0 ) 
        
        setSubTag(
            subTag.includes( subId as number ) ? subTag.filter( (res: number) => res != subId )
                                               : [ ...subTag, subId as number  ]
        )
    }

    const IconStatusSup = ({ ...props }) => (
        <>
            {
                subTag.includes( props?.id ) 
                ? ( 
                    <span onClick={handleToggerSub} data-sub={props.id} >
                        <svg data-sub={props.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path data-sub={props.id}  fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                        </svg> 
                    </span>
                    )
                : (
                    <span onClick={handleToggerSub} data-sub={props.id} >
                        <svg data-sub={props.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                        </svg> 
                    </span>
                    )
            }
            &nbsp;&nbsp;&nbsp;&nbsp;
        </>
    )

    const renderSubCatelories: any = (rub: any = [] , level = 1) => {
        
        const style = { marginLeft: `${level * 2}0px` }
        const subBelong = rub[0]?.parent_id || null
    
        return (
            <>
                {
                    rub.map( (val:any) => (
                       <>
                         <tr key={`inds-${val?.id}`}>
                            <td >
                                <div className="d-flex px-2 py-1" style={style} >
                                    { (val?.subCategories?.length > 0) ? <IconStatusSup id={val?.id} /> : (<> <span style={{ padding: '15px' }}></span></>) }
                                    <h6 className="mb-0 text-sm">{ val?.id }</h6>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex px-2 py-1" style={style} >
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">{ val?.name }</h6>
                                    </div>
                                </div>
                            </td>

                            <td className="align-middle"  >
                                <div className="btn" style={style} >
                                    Edit
                                </div>

                            </td>
                        </tr>
                        { (val?.subCategories?.length > 0) && subTag.includes( val?.id as number ) &&  renderSubCatelories(val?.subCategories, level + 1 ) }
                       </>
                    ) )
                }
            </>
        )
    }
  

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card my-4 scrollTable" onScrollCapture={handleLoadMore}>
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 ">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 row">
                                <div className="col-6"><h6 className="text-white text-capitalize ps-3">Catelory table</h6></div>
                                <div className="col-6">
                                    <h6 className="text-white text-capitalize ps-3">
                                        <input type="text" name="key_word" placeholder="key word" defaultValue={fields?.key_word} onChange={handleChangeKeyWord} />
                                    </h6>
                                </div>

                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                            <th className="text-secondary opacity-7" style={{ width: "20px" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        items.map( (val: any, index: any) => 
                                            (
                                            <>
                                                <tr key={`inds-${val?.id}`}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                        { (val?.subCategories?.length > 0) ? <IconStatusSup id={val?.id} /> : (<> <span style={{ padding: '15px' }}></span></>) }
                                                            <h6 className="mb-0 text-sm">{ val?.id }</h6>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{ val?.name }</h6>
                                                            </div>
                                                        </div>
                                                    
                                                    </td>

                                                    <td className="align-middle">
                                                        Edit
                                                    </td>
                                                </tr>
                                             
                                                { (val?.subCategories?.length > 0) && subTag.includes( val?.id as number ) && renderSubCatelories(val?.subCategories, 1 ) }
                                               
                                            </>
                                            ) 
                                        )
                                    }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            {/* <footer className="footer py-4  ">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 mb-lg-0 mb-4">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © <script>
                                    document.write(new Date().getFullYear())
                                </script>,
                                made with <i className="fa fa-heart"></i> by
                                <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Creative Tim</a>
                                for a better web.
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">Creative Tim</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer> */}
        </>
    )
}

export const getServerSideProps = SideProps;


export default function Login(props: any) {
     return (<LayoutAdmin {...props} title="Admin | Catelories" ><Child {...props} hoock={CateloriesHook} /></LayoutAdmin>);
}
