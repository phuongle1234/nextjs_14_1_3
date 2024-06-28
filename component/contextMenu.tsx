import React from "react"
import { useOnClickOutside } from "usehooks-ts"

export const MenuContext = ({ ...props }: any) => {

    const { contextInfor, handleDeleteRow, handleAddRow, handleSubmit, setContex } = props
    const refContext = React.useRef(null)

    useOnClickOutside(refContext, (e: any)=>{ setContex({})  })

    if(props?.locationX && props?.locationY)
        return (
            <div ref={refContext} className="context-menu" style={{ top: `${props?.locationY -75}px`, left: `${props?.locationX - 270}px` }}>
                 <ul className="list-group">
                    <li className="list-group-item list-group-item-action bg-gradient-dark">
                        <button onClick={handleAddRow} className="btn" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
                                <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                                <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
                            </svg> &nbsp; &nbsp;
                            add item <small>(Ctrl Shift +)</small>
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
            </div>
        )

    return (<></>)
}

export const handleContextMenu = ({event, setContex }: any) => {
    const {  pageX, pageY, offsetLeft, offsetTop, target } = event

    if( !['INPUT', 'SELECT'].includes(target.nodeName as string) )
        return false

    event.preventDefault(); 
    const index =  Number( target.getAttribute("data-index") || 0)     
    setContex({ locationX: pageX, locationY: pageY, index  })

  }