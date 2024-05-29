import React from "react";
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { from } from "@/enum/form";
import Joi from "Joi"
import  { filedContext } from "@/provide/field";
import { AuthModelView } from "@/model/auth"
import { promises } from "dns";

export const LoginHook = () => {
    

    const { setFiled, setFromName, setFromConturct, setFormFiled, filedData, fields, fromName, resetFrom, dispatch  } = React.useContext(filedContext) as any
        
    const Auth = new AuthModelView()
          Auth.setDispath(dispatch)

    let fromFiled:  { [key: string] : any } = {
                                                email: { val: "", type: 'text', isParam: true, Joi: `string.email|${ JSON.stringify( { minDomainSegments: 2, tlds: { allow: false   } } ) }.messages|${ JSON.stringify( from?.email ) }` },
                                                password: { val: "", type: 'text', isParam: true, Joi: `string.min|5.required.messages|${ JSON.stringify( from?.password ) }`  },
                                                remember: { val: false, type: 'boolean', Joi: "string.min|5.required"  }
                                             };


    const { fromLogin, formInfo, validate }: any = { ...filedData,  fromLogin: filedData?.fromLogin || {}  }
    

    React.useEffect( () =>{
        
        setFiled(fromFiled),
        setFromName("fromLogin")        

        return () => {
            setFiled({})
            setFromName("")
        }
        
    }, [ ] )

    const intContruct = ( Object.keys(fields).length >= 1 ) && (fromName != "")

    React.useEffect( () =>{
        
        if(intContruct)
            setFromConturct()

        return () => { resetFrom() }

    }, [intContruct] )

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        let param: any = { ...fromLogin }
        delete param?.remember
        
        const res: any = await Auth.login(param)
        
        console.log( { res } );
        
    }
  

    
    return { fromLogin, formInfo, validate, setFormFiled, handleSubmit }
}