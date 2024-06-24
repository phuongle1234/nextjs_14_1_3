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

export const CateloriesHook = () => {
    

    const { 
            setFiled, stage, storeInfo, 
            setFormFiled, dispatch, 
            setOwnStore, router, hasOwnStore, 
            intAterContruct, fetchs, handleChangeKeyWord, handleLoadMore 
          } = React.useContext(AccessContext) as any
    

    setOwnStore("categories")
    
    // const modelService = categoriesModel
    //       modelService.setDispath(dispatch)

    let fromFiled:  { [key: string] : any } = {
                                                key_word: { val: ""  },
                                                page: { val: 1  },
                                                // hasLoadMore: { val: false  },
                                              };

    const { currentPage, lastPage, perPage, total, fields, items } = stage 
    
    
    // init filed data 
    React.useEffect( () =>{
        
        setFiled(fromFiled)
        return () => { setFiled({}), setOwnStore("") }
        
    }, [] )

    
    React.useEffect( () =>{
        
        if(intAterContruct)
        {            
            fetchs(categoriesModel)
        }
        
    }, [intAterContruct] )

  
   
    return { setFormFiled, handleChangeKeyWord,  handleLoadMore, items, fields }
}