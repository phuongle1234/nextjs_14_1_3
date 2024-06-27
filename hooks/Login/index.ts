import React from "react";
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { from } from "@/enum/form";
import Joi from "Joi"
import  { AccessContext } from "@/provide/access";
import  AuthModelView  from "@/model/auth"
import { promises } from "dns";
import { cryptoAES } from "@/service/ensrip";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { channel } from "diagnostics_channel";

export const AuthencationHook = () => {
    

    const {
            setFiled, stage, hasOwnStore, storeInfo, setType,
            setFromConturct, setFormFiled, filedData, fields, 
            resetFrom, dispatch, ownStore, setOwnStore, router

          } = React.useContext(AccessContext) as any
    
    // define store
   
    const Auth = AuthModelView
          Auth.setDispath(dispatch)
    
    let localStore: any = {}

    if( typeof window == "object" )
    {
        localStore = localStorage.getItem("auth")
        localStore = localStore ? JSON.parse( localStore ) : {}
    }

    let fromFiled:  { [key: string] : any } = {
                                                email: { val: localStore?.email || "", type: 'text', Joi: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false   } }).required() },
                                                password: { val: "", type: 'text', Joi: Joi.string().min(5).required()  },
                                                remember: { val: localStore?.remember || false, type: 'boolean' }
                                             };

    
    const {  fromLogin, formInfo, validate, attributes }: any = { ...stage, fromLogin: stage?.fields || {}, formInfo: stage?.fields || {}  }
    
    // init filed data 
    React.useEffect( () =>{
        
        setType("fields")
        setOwnStore("auth")
        setFiled(fromFiled)

        return () => { setFiled({}), setOwnStore("") }
        
    }, [] )

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        try {

            let param: any = { ...fromLogin }
            delete param?.remember
            
            const res: any = await Auth.login(param)
            setCookie( "access_token", res?.token )

            delete res.token

            if( fromLogin?.remember )
             localStorage.setItem( "auth", JSON.stringify( { ...res, remember: param?.remembe } ) );
            
             
            dispatch( storeInfo?.module?.setAttributes(res) )
            
            return router.push("/adminOffice")

        } catch (error) {
            console.log( { error } );
            deleteCookie("access_token")
        }
      
        
    }
    

    
    return { fromLogin, formInfo, validate, setFormFiled, attributes, handleSubmit }
}