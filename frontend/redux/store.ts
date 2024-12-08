import {configureStore} from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";

const store = configureStore({
    reducer : {
        locations: locationReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;