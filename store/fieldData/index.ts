"use strict"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Joi from "Joi"

interface IState {
  [key : string]: any,
  formInfo : { [key : string]: any },
  validate : { [key : string]: any }
}

const initialState: IState = { 
  formInfo: {},
  validate: {}
};

export const FieldSlice = createSlice({
  name: "filedData",
  initialState,
  reducers: {
    
    setFromContruct(state, action ) {
      
        const { data, filed } = action.payload
        
        const fields: any = {};
  
        Object.keys(data).forEach( (key: any) => (fields[key] = ( typeof data[key].val == "boolean" || data[key].val ) ? data[key].val : "") );
        
        state.validate = {};
        state.formInfo = { ...data };
        state[filed] = fields;
    },
    clearFrom : (state) => {
      Object.assign(state, initialState)
    },
    setFormData : (state, action) => {
        const { data, field } : any = action.payload;
        
        const key = Object.keys(data)[0]

        const schema: { [key: string] : any } = {}
              schema[key as string] =  state.formInfo[key]?.Joi.split(".").reduce( (acc: any, cur:any) => {
                
                                                const fnt = cur.split("|" ) 

                                                if( fnt[1] && ['email', 'messages' ].includes(fnt[0] as string) )       
                                                 return acc[fnt[0]]( JSON.parse(  String( fnt[1] ).replaceAll('_', '.')   ) )   
                                                    
                                                
                                                return  fnt[1] ? acc[fnt[0]](Number(fnt[1])) : acc[fnt[0]]()

                                         }, Joi )
        
        const { error } =  Joi.object(schema).validate(data , { abortEarly: false } )

        //console.log( { error: error?.message } );

        state.validate[key] = {
                                  success: !error,
                                  error: error?.message
                              }

        Object.assign( state[ String( field ) ], data )
        //state[ String( field ) ] = data;
    },

  
  },
  extraReducers: (builder) => {},
});

export default FieldSlice;
export const globalReducer = FieldSlice.reducer;
export const { setFormData, setFromContruct, clearFrom } = FieldSlice.actions;
