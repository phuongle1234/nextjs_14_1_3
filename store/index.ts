import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global";
import FieldSlice from "./fieldData";
import AuthSlice from "./Auth";
import logger from "redux-logger";



export type RootState = ReturnType<any>;

export const store = () => {
  return configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
      //[FieldSlice.name]: FieldSlice.reducer,
      [AuthSlice.name]: AuthSlice.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
             //.concat(logger);
    },
  });
};


export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType,RootState,unknown,Action>;

