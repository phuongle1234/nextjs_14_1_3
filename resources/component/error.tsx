import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { setStage } from "@/store/global";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';

const Error = (props : any) => {

    const dispatch = useDispatch()
    const { msg } = useSelector( (stage:any) => stage?.global )

    
    const isShow = ( msg?.message ) && ( msg?.message!= "" ) || false

    const variant = msg?.code == 200 ? "success" : "danger"

   

    React.useEffect( () => {
        
        const timeOutMesg: any = setTimeout( () => dispatch( setStage( { msg: {} } ) ), 2000 )

        return () => { clearTimeout( timeOutMesg ) }

    },[isShow])

    if(isShow)
    return ( 
        <Modal show={true}  >
            <Modal.Body bsPrefix="modalCustom"><Alert className="alertCustom" transition={true} key={variant} variant={variant}>{ msg?.message || "" }</Alert></Modal.Body>
        </Modal>
    )

    return(<></>)
}


export default Error