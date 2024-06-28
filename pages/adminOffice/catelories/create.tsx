import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SideProps } from "@/service/sideProps";
import LayoutAdmin from "@/app/layout/admin";
import { CreateCateloriesHook } from "@/hooks/Catelories/create";
import debounce from "debounce";
import { usePress } from "@/helper/press";
import { Modal, Alert } from "react-bootstrap";
import { useOnClickOutside } from "usehooks-ts";
import { MenuContext, handleContextMenu } from "@/component/contextMenu";

const Child = ({ ...props }: any) => {
    
    const { items, setFormFiled, handleAddRow, handleDeleteRow, handleSubmit } =  props?.hock()
        
    const [ subTag, setSubTag ]: any = React.useState <any> ([])

    usePress( { handleSubmit,
                handleInsert: handleAddRow,
                handleDelete: (e:any) => { 
                    const activeDom: any = document.activeElement

                    if( !['INPUT', 'SELECT'].includes( activeDom?.nodeName as string ) )
                        return false;

                    console.log({ activeDom, name: activeDom?.target }); 
                }, 
    } )

    const [ contextInfor, setContex ]: any = React.useState <object> ( { } )

    return (
        <div className="conent-main">
           <MenuContext { ...props } { ...contextInfor } setContex={setContex} 
                        handleDeleteRow={handleDeleteRow} 
                        handleAddRow={handleAddRow} 
                        handleSubmit={handleSubmit}  />
            <div className="row">
                <div className="col-12">
                    <div className="card my-4 scrollTable" >
                      
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Note</th>
                                            <th className="text-secondary opacity-7" style={{ width: "20px" }}>
                                            <div className="btn" >
                                                <span onClick={handleAddRow} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
                                                    <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                                                    <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
                                                </svg>
                                                </span>
                                            </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {
                                    items.map( (val:any, ind: any) =>
                                    (
                                    <>
                                        <tr key={`fromIND-${ind}`} onContextMenu={(e:any) => handleContextMenu({ event:e, setContex }) } >
                                        <td key={`id-IDS-${ind}`} >{ ind + 1 }</td>
                                            {
                                                Object.keys(val).filter((res:any) => ['name','note'].includes(res as any) )
                                                    .map( (td:any, inds: number) =>
                                                    <>
                                                        <td key={`keys-${ind}-${td}`} >
                                                            <div className="input-group mb-3">
                                                                <input type="text" autoComplete="off" name={td} data-index={ind} className="form-control" placeholder={td} value={val[td as string]} onChange={setFormFiled} />
                                                            </div>
                                                            { ( val?.error?.hasOwnProperty(td as string) )&& (<p className="small mb-2 text-danger">{ val?.error[td as string] }</p>)  } 
                                                        </td> 
                                                    </>
                                                    )                                            
                                            } 
                                        <td key={`id-des-${ind}`} >
                                            <span onClick={handleDeleteRow} data-index={ind} >
                                                <svg data-index={ind} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-minus" viewBox="0 0 16 16">
                                                    <path data-index={ind} d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
                                                    <path data-index={ind} d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5" />
                                                </svg>
                                            </span>
                                        </td>
                                        </tr> 
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
        </div>
    )
}

export const getServerSideProps = SideProps;


export default function Login(props: any) {
     return (<LayoutAdmin {...props} title="Admin | Catelories" ><Child {...props} hock={CreateCateloriesHook} /></LayoutAdmin>);
}
