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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                    </svg>
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
                                            <th className="text-secondary opacity-7" style={{ width: "20px" }}>
                                            <div className="btn" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                                </svg>
                                            </div>
                                            </th>
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                                        </svg>
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
           
        </>
    )
}

export const getServerSideProps = SideProps;


export default function Login(props: any) {
     return (<LayoutAdmin {...props} title="Admin | Catelories" ><Child {...props} hoock={CateloriesHook} /></LayoutAdmin>);
}
