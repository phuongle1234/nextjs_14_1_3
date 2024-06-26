import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import internal from "stream";
import { intItems, initFormInfo, Iform, Iitems, setFromContruct, setFormData, changeStage, clearFrom } from "@/traits/store";
import { initMutiFormInfo, IMutiform, setMutiFromContruct } from "@/traits/store/multi_rows";


const initialState: Iform & Iitems & IMutiform= {
    ...intItems,
    ...initFormInfo,
    ...initMutiFormInfo
};

const reducers: any = {
    clearFrom,
    changeStage,
    setFromContruct,
    setFormData,
    setMutiFromContruct,
    setAttributes: (stage: any, action: any) => {        
        Object.assign( stage , { attributes: action?.payload } )
    }
}

export const CategoriesSlice: any = createSlice({
  name: "categories",
  initialState,
  reducers,
  extraReducers: (builder) => {},
});

export default CategoriesSlice;

// export const globalAuthSliceReducer = AuthSlice.reducer;
export const { actions } = CategoriesSlice;
