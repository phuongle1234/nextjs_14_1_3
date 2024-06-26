import React from "react";
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { from } from "@/enum/form";
import Joi from "Joi"
import  { AccessContext } from "@/provide/access";
import categoriesModel from "@/model/catelories";
import { promises } from "dns";
import { cryptoAES } from "@/service/ensrip";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { channel } from "diagnostics_channel";

export const CreateCateloriesHook = () => {
    

    const { 
            setFiled, stage, storeInfo, setType,
            dispatch, setOwnStore, router, setFormFiled, handleAddRow
          } = React.useContext(AccessContext) as any
    
    
    
    let fromFiled:  { [key: string] : any } = {
                                                name: { val: '', Joi: Joi.string().required() },
                                                parent_id: { val: '', Joi: Joi.number() },
                                                note: { val: '', Joi: Joi.string().allow("") },
                                              };

    const { currentPage, lastPage, perPage, total, mutiFields, mutiValidate  } = stage 
    
    
    // init filed data 
    React.useEffect( () =>{
        
        setType( 'mutiFields' )
        setOwnStore("categories")
        setFiled(fromFiled)

        return () => {
            if( storeInfo?.name )
            dispatch(  storeInfo?.module?.changeStage({ mutiFields: [] }) )
        }

    }, [] )

    

    return { items: mutiFields, setFormFiled, handleAddRow }
}