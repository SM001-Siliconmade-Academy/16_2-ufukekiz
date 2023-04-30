import { configureStore } from "@reduxjs/toolkit";
import BrandsSlice from "../screens/Categories/BrandsSlice";

export const store = configureStore({
    reducer: {
        brands: BrandsSlice
    },
})