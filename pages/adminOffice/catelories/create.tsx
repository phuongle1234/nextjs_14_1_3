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

const Child = ({ ...props }: any) => {
    
    const { items, setFormFiled, handleAddRow, handleDeleteRow, handleSubmit } =  props?.hock()
        
    const [ subTag, setSubTag ]: any = React.useState <any> ([])

    usePress( { KeyDown: handleSubmit } )

    const [ contextInfor, setContex ]: any = React.useState <object> ( { } )

    const MenuContext = ({ children,...props }: any) => {

        const refContext = React.useRef(null)

        useOnClickOutside(refContext, (e: any)=>{ setContex({})  })

        if(props?.locationX && props?.locationY)
            return (
                <div ref={refContext} className="context-menu" style={{ top: `${props?.locationY -75}px`, left: `${props?.locationX - 270}px` }}>
                    { children }
                </div>
            )

        return (<></>)
    }

    const handleContextMenu = (e: any) => {
        const {  pageX, pageY, offsetLeft, offsetTop, target } = e

        if( !['INPUT', 'SELECT'].includes(target.nodeName as string) )
            return false

        e.preventDefault(); 
        const index =  Number( target.getAttribute("data-index") || 0)     
        setContex({ locationX: pageX, locationY: pageY, index  })

      }

    return (
        <div className="conent-main">
           <MenuContext { ...props } { ...contextInfor } setContex={setContex} >
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action bg-gradient-dark">
                        <button onClick={handleAddRow} className="btn" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
                                <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                                <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
                            </svg> &nbsp; &nbsp;
                            add item
                        </button>
                    </li>
                    <li className="list-group-item list-group-item-action bg-gradient-dark">
                        <button onClick={handleDeleteRow} data-index={contextInfor?.index} className="btn" >
                            <svg data-index={contextInfor?.index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-minus" viewBox="0 0 16 16">
                                <path data-index={contextInfor?.index} d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
                                <path data-index={contextInfor?.index} d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5" />
                            </svg>
                            &nbsp; &nbsp;
                            delete item
                        </button>
                    </li>
                    <li className="list-group-item list-group-item-action bg-gradient-dark">
                        <button onClick={handleSubmit} data-index={contextInfor?.index} className="btn" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
                            </svg>
                            &nbsp; &nbsp;
                            submit item <small>(Ctrl + F5)</small>
                        </button>
                    </li>
                </ul>
           </MenuContext>
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
                                        <tr key={`fromIND-${ind}`} onContextMenu={handleContextMenu} >
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
