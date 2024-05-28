import React from "react";
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { from } from "@/enum/form";
import Joi from "Joi"
import  { FiledContext } from "@/provide/field";

export const LoginHook = () => {
    
    const dispatch = useDispatch()
    
    //const hoockFiled = React.useContext(FiledContext) as any
   

    

    let fields:  { [key: string] : any } = {
                                                email: { val: "", type: 'text', Joi: `string.email|${ JSON.stringify( { minDomainSegments: 2, tlds: { allow: false   } } ) }.messages|${ JSON.stringify( from?.email ) }` },
                                                password: { val: "", type: 'text', Joi: `string.min|5.required.messages|${ JSON.stringify( from?.password ) }`  },
                                                remember: { val: false, type: 'boolean', Joi: "string.min|5.required"  }
                                            };

    const filedData = useSelector( (stage:any) => stage?.filedData )

    const { fromLogin, formInfo, validate }: any = { ...filedData,  fromLogin: filedData?.fromLogin || {}  }
        

    React.useEffect( () =>{
        
        dispatch( setFromContruct({ data: fields, filed: "fromLogin" }) )

    }, [ Router ] )

    const setFormFiled =  (event :any) => {

        try {
        
            const { name, value, checked } = event.target

            if( !Object.keys(fields).includes(name as string) )
                return false

       
            let data: {[key: string] : any } = {}
                data[name] = ( ( fields[name] || {} )?.type == 'boolean' ) ? checked : value

    
            dispatch( setFormData({ data, field: "fromLogin" }) )

        } catch (error) {
            console.log( { error } );
            
        }
        
    } 

    
    return { fromLogin, formInfo, validate, setFormFiled }
}