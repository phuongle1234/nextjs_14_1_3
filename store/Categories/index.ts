import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import internal from "stream";
import { intItems, initFormInfo, Iform, Iitems, setFromContruct, setFormData, changeStage } from "@/traits/store";


const initialState: Iform & Iitems= {
    ...intItems,
    ...initFormInfo
};

const reducers: any = {
    changeStage,
    setFromContruct,
    setFormData,
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
