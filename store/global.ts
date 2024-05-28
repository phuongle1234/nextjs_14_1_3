import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IModal {
  modalId: string;
  isCloseAll: boolean;
  isShow: boolean;
  data? : any;
}

interface WorkingOrderLog {
  orderId: number;
  startTime: any,
  type: string | "order" | "confirm"
}
interface IState {
  [key : string]: any,
  isLoading: boolean;
  msg: any;
  modalList: IModal[];
  workingOrderLogs: Array<WorkingOrderLog>;
  backHistoryUrl: string;
  item: any
}
const initialState: IState = {
  isLoading: false,
  msg: {},
  modalList: [],
  workingOrderLogs: [],
  backHistoryUrl: "",
  item: []
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setStage: (state, action) => {
      //let historyUrl = action.payload;
      Object.assign(state, {...action.payload})
      //state.backHistoryUrl = historyUrl;
    }

  
  },
  extraReducers: (builder) => {},
});

export default globalSlice;
export const globalReducer = globalSlice.reducer;
export const { setStage } = globalSlice.actions;
