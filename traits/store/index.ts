import Joi from "Joi"
import internal from "stream"

export interface Iform {
    [key : string]: any,
    fields : { [key : string]: any },
    filter: { [key : string]: any },
    validate : { [key : string]: any }
}
  
export const initFormInfo: Iform = { 
  fields: {},
  filter: {},
  validate: {}
}

export interface Iitems {
  [key : string]: any,
  items: [],
  currentPage: internal | null,
  lastPage: internal | null,
  perPage: internal | null,
  total: internal | null
}

export const intItems: Iitems = {
  items: [],
  currentPage: null,
  lastPage: null,
  perPage: null,
  total: null
}

export const setFromContruct = (state: any, action: any ) => {
      
  const { data, filed }: any = action.payload
  
  switch(filed)
  {
    case 'fileds':
      state.validate = {};
    case 'filter':
      state[filed as string] = { ...data }; break;
    case 'mutiFields':
      state.mutiFields = [ data ]; break;
  }

}

export const clearFrom = (state: any) => {  
  Object.assign(state, initFormInfo )
}

export const setFormData = (state: any, action: any ) => {
  const { data, error, type } : any = action.payload;
  
  const key = Object.keys(data)[0]
  state.validate[key] = { success: !error, error: error }

  switch(type)
  {
    case "fields":  Object.assign( state.fields, data ); break;
    case "filter":  Object.assign( state.filter, data ); break;
  }
  
}

export const changeStage = (state: any, action: any) => {
  Object.assign(state, {...action.payload})
}

