import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/Theme/Theme_slice"
export const store = configureStore({
    reducer:{
        theme:themeReducer
    }
});