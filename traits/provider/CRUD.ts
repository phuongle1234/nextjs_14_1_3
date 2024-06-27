import React from "react"

export const fetchs = async ({ modelView, stage, dispatch, storeInfo }: any) => {

    try {
        
        const res: any =  await modelView.read(stage?.filter)
        let data: any =  { ...res.data }
        

        data['items'] = stage?.filter?.page > 1 ? [ ...stage?.items, ...data?.data ] 
                                                : data?.data
        
        delete 	data?.data
        dispatch( storeInfo.module?.changeStage( { ...data } ) )
        
    } catch (err: any) {
        console.log( { err } );
        
    }
}