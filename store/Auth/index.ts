import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import internal from "stream";
import { initFormInfo, Iform, setFromContruct, setFormData, changeStage } from "@/traits/store";

interface IState {

    attributes: {
        name : string,
        email : string,
        role: 'admin' | 'client' | '' ,
        status: 'active' | 'inactive' | '',
        age: internal | null,
    },

}

const initialState: IState & Iform = {

    attributes: {
        name: "",
        email: "",
        role: "",
        status: "",
        age: null,
    },
    ...initFormInfo
};

const reducers: any = {
    changeStage,
    setFromContruct,
    setFormData,
    setAttributes: (stage: any, action: any) => {        
        // const { attributes } = action?.payload
        Object.assign( stage , { attributes: action?.payload } )
    }
}

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers: (builder) => {},
});

export default AuthSlice;

//export const globalReducer = globalSlice.reducer;
// export const { ...reducers } = globalSlice.actions;
