import React from "react";
import { store } from "@/store";
import { setStage } from "@/store/global";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";



// import { StoreProvider } from "@/resources/provider/StoreProvider";

export const HomeHook = () => {

    const dispatch = useDispatch()

    const global = useSelector( (stage:any) => stage?.global )
        

    React.useEffect( () =>{
        
        const int = () => {  
            dispatch( setStage( { backHistoryUrl: "PhuongTestLink Helohii" } ) )  
            dispatch( setStage( { item: [ 201, 405, 11 ] } ) )  
        }

        int()   

    }, [ Router ] )

    
    return { global }
}