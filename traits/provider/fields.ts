import Joi from "Joi"

export const joiValidate = ({ name, fields, value, checked = false }: any) => {
		
    let data: { [key: string]: any } = {}
    data[name] = ((fields[name] || {})?.type == 'boolean') ? checked : value

    const hasJoi = fields[name as string].hasOwnProperty("Joi")

    let joi: any = {}
    joi[name] = fields[name as string]?.Joi
    
    const error = hasJoi ? Joi.object().keys(joi).validate(data)?.error?.message : "";

    joi[name] = { success: !error, error: error }

    return { data, joi, error }
}

export const mapValueFileds = ({ fields }: any) => Object.keys(fields).reduce((acc: any, cur: any) => {
                            let obj: any = {}
                            obj[cur as string] = fields[cur as string]?.val
                            return ({ ...acc, ...obj })
                        }, {})

export const setFromConturct = async ({ stage, dispatch, fields, type, storeInfo } : any) => {
		
    if( !Object.keys( stage[type as string] ).length )
    {			
        dispatch( storeInfo?.module?.setFromContruct({ data: mapValueFileds({fields}), filed: type }) )

        const hasValidate = Object.keys(fields).filter((res: any) => (fields[res as string]?.val != ""))

        if (hasValidate?.length) {
            const validate: any = await hasValidate.reduce(async (cur: any, acc: any) => ({ ...(await cur), ...joiValidate({ name: acc, fields, value: fields[acc as string].val })?.joi }), Promise.resolve({}))
            dispatch(storeInfo?.module?.changeStage({ validate }))
        }
    }

}

export const checkValidMutiRow = (fields: any)=> (
    ! Object.keys(
        fields?.find( (cur: any, acc: any) => {

            const _row = fields[acc as number]
            
            if(!_row?.error)
                return true
            
            return Object.keys(_row?.error)?.filter( (res:any) => _row?.error[res as string]!= undefined )?.length
            
            }) || {}
    )?.length
)

export const setFiledData = ({ event, fields, type, storeInfo, dispatch, stage }: any) => {

    const { name, value, checked } = event.target
    const { data, error } = joiValidate({ fields, value, name, checked })
    
    switch(type)
    {
        case "filter":
        case "fields":
            dispatch(storeInfo?.module?.setFormData({ data, error, type })); break;
        case "mutiFields":
            const index = event.target.getAttribute("data-index")
            let fils: any = [ ...stage?.mutiFields ]

            const _thisRow = fils[index as number]
            let erorr = { ... (_thisRow?.error || {} ) }
                erorr[name as string] = error
                fils[index as number] = {  ..._thisRow , ... data, error: erorr } 
                
                dispatch(storeInfo?.module?.changeStage({ mutiFields: fils }) ); 
                break;
            
            break;
    }
}


