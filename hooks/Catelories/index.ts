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
import CategoriesSlice from "@/store/Categories";
import { channel } from "diagnostics_channel";

export const CateloriesHook = () => {
    
 
    const { 
            setFiled, stage, storeInfo, setType, fields,
            setFormFiled, dispatch, 
            setOwnStore, router, hasOwnStore, changeStage,
            intAterContruct, fetchs, handleChangeKeyWord, handleLoadMore 
          } = React.useContext(AccessContext) as any
    
  
    
    // const modelService = categoriesModel
    //       modelService.setDispath(dispatch)

    let fromFiled:  { [key: string] : any } = {
                                                key_word: { val: ""  },
                                                page: { val: 1  },
                                                // hasLoadMore: { val: false  },
                                              };
    
    const { currentPage, lastPage, perPage, total, items, filter } = stage 
    
    
    // init filed data 
    React.useEffect( () =>{
                
        setType('filter')
        setOwnStore("categories")
        setFiled(fromFiled)
        
        return () => {            
            dispatch( CategoriesSlice.actions.setFormData({  data: { page: 1 }, type: 'filter' }) )
        }
    
    }, [] )

   
    const int = JSON.stringify( fields ) == JSON.stringify( fromFiled ) && ( Object.keys(filter).length >= 1 ) && JSON.stringify( filter )
    
    
    React.useEffect( () =>{
        
        if(int)
        {
          fetchs({ modelView: categoriesModel, stage, dispatch, storeInfo })  
        }
                

    }, [ int ] )

  
   
    return { setFormFiled, handleChangeKeyWord,  handleLoadMore, items, fields: filter }
}