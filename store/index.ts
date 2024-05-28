import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import globalSlice from "./global";
import FieldSlice from "./fieldData";
import logger from "redux-logger";



//const rootReducer = combineSlices(globalSlice);

// Infer the `RootState` type from the root reducer

export type RootState = ReturnType<any>;


export const store = () => {
  return configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
      [FieldSlice.name]: FieldSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
             .concat(logger);
    },
  });
};

//.concat(quotesApiSlice.middleware)
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof store>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType,RootState,unknown,Action>;
//export type AppDispatch = typeof store.dispatch;
