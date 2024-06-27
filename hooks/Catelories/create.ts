import React from "react";
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
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
            setFiled, stage, storeInfo, setType, handleDeleteRow, useSelector,
            dispatch, setOwnStore, router, setFormFiled, handleAddRow, checkValidMutiRow
          } = React.useContext(AccessContext) as any
    
    const modelSevice = categoriesModel
          modelSevice.setDispath(dispatch)
    
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

    const handleSubmit = async (e :any) => {

        try {
        
        if( ! checkValidMutiRow(mutiFields) )
        {
            alert("The data is not eligible to save, please check again")
            return false
        }
          
            
        if( ! confirm("Do you want to update the data?") )
            return false
        

        const res = await modelSevice.create(
                        mutiFields.map((res:any) => {
                            const item: any = { ...res }
                            delete item?.error

                            if( !item?.parent_id )
                            delete item?.parent_id

                            return item
                        })
                    )

        router.push(`/adminOffice/catelories`)
           
                
        } catch (err: any) {
            console.log({ err } );
            
        }

    }
    

    return { items: mutiFields, setFormFiled, handleAddRow, handleDeleteRow, handleSubmit }
}