import Joi from "Joi"
import internal from "stream"

export interface Iform {
    [key : string]: any,
    fields : { [key : string]: any },
    validate : { [key : string]: any }
}
  
export const initFormInfo: Iform = { 
  fields: {},
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
      
  const { data, filed } = action.payload
  
  state.validate = {};
  state.fields = { ...data };
}

export const clearFrom = (state: any) => {
  Object.assign(state, initFormInfo)
}

export const setFormData = (state: any, action: any ) => {
  const { data, error } : any = action.payload;
  
  const key = Object.keys(data)[0]
  state.validate[key] = { success: !error, error: error }
  Object.assign( state.fields, data )
  //state[ String( field ) ] = data;
}

export const changeStage = (state: any, action: any) => {
  Object.assign(state, {...action.payload})
}

