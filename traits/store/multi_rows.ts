import Joi from "Joi"
import internal from "stream"

export interface IMutiform {
    //[key : string]: any,
    mutiFields : { [key : string]: any },
    mutiValidate : { [key : string]: any }
}
  
export const initMutiFormInfo: IMutiform = { 
  mutiFields: [],
  mutiValidate: []
}

export const setMutiFromContruct = (state: any, action: any ) => {
      
  const { data } = action.payload
  
  state.mutiValidate = [];
  state.mutiFields = [ ...data  ];
}

// export const clearFrom = (state: any) => {
//   Object.assign(state, initFormInfo)
// }

// export const setFormData = (state: any, action: any ) => {
//   const { data, error } : any = action.payload;
  
//   const key = Object.keys(data)[0]
//   state.validate[key] = { success: !error, error: error }
//   Object.assign( state.fields, data )
//   //state[ String( field ) ] = data;
// }

// export const changeStage = (state: any, action: any) => {
//   Object.assign(state, {...action.payload})
// }

