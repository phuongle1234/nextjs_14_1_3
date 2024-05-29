import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { setStage } from "@/store/global";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';

const Loading = (props : any) => {

    //const dispatch = useDispatch()
    const { isLoading } = useSelector( (stage:any) => stage?.global )


    //React.useEffect( () => {
        
    //     const timeOutMesg: any = setTimeout( () => dispatch( setStage( { msg: {} } ) ), 2000 )

    //     return () => { clearTimeout( timeOutMesg ) }

    // },[isShow])

    //if(isShow)

    return ( 
        <Modal show={true} contentClassName="modalLoading" centered  >
            <Modal.Body>
                    <div className="loader"></div>
            </Modal.Body>
        </Modal>
    )

    //return(<></>)
}


export default Loading