import React from "react";
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { from } from "@/enum/form";
import Joi from "Joi"
import  { filedContext } from "@/provide/field";
import { AuthModelView } from "@/model/auth"
import { promises } from "dns";
import { cryptoAES } from "@/service/ensrip";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { channel } from "diagnostics_channel";

export const HomeAdminHook = () => {
    

    const { setFiled, setFromName, setFromConturct, setFormFiled, filedData, fields, fromName, resetFrom, dispatch, socket  } = React.useContext(filedContext) as any
        
    const Auth = new AuthModelView()
          Auth.setDispath(dispatch)

    const router = useRouter()      

    let fromFiled:  { [key: string] : any } = {
                                                email: { val: "", type: 'text', isParam: true, Joi: `string.email|${ JSON.stringify( { minDomainSegments: 2, tlds: { allow: false   } } ) }.messages|${ JSON.stringify( from?.email ) }` },
                                                password: { val: "", type: 'text', isParam: true, Joi: `string.min|5.required.messages|${ JSON.stringify( from?.password ) }`  },
                                                remember: { val: false, type: 'boolean', Joi: "string.min|5.required"  }
                                             };


    const { fromLogin, formInfo, validate }: any = { ...filedData,  fromLogin: filedData?.fromLogin || {}  }
    
    // authen soket
    // getCookie("access_token")                               
    
    

    
    React.useEffect( () =>{
        
        socket.emit("authenticate", getCookie("access_token") , (data: any) => { console.log( { data } ); });

        socket.on("prodcuts", (e:any)=> {
            console.log( { e, channel: "prodcuts" } );
        })
        
        setFiled(fromFiled),
        setFromName("fromLogin")        

        return () => {

            socket.off("prodcuts");

            setFiled({})
            setFromName("")
        }
        
    }, [] )

    const intContruct = ( Object.keys(fields).length >= 1 ) && (fromName != "")

    React.useEffect( () =>{
        
        if(intContruct)
            setFromConturct()

        return () => { resetFrom() }

    }, [intContruct] )

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        try {

            let param: any = { ...fromLogin }
            delete param?.remember
            
            const res: any = await Auth.login(param)
            
            setCookie( "access_token", res?.token )
            // setCookie( "auth_ct5", cryptoAES.parse( { email: res?.email, id: res?.id } ) )
            
            return router.push("/adminOffice")

        } catch (error) {
            console.log( { error } );
            deleteCookie("access_token")
            // deleteCookie("auth_ct5")
        }
      
        
    }
    

    
    return { fromLogin, formInfo, validate, setFormFiled }
}