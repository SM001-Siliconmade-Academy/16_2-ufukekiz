import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const initialState = {
    brands: [],
    status: "idle",
    error: null
  }
  
  const dataRef =  collection(db, "brandList")
  
  export const getBrandList = createAsyncThunk(
    "categoryBrands/getcategoryBrands", async () => {
      const querySnapshot = await getDocs(dataRef)
      const dataArray = querySnapshot.docs.map((doc) => doc.data())
      return dataArray
    })
  
  const CategoryBrandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getBrandList.pending, (state) => {
        state.status = "loading"
      })
        .addCase(getBrandList.fulfilled, (state, action) => {
          state.status = "succeeded"
          state.brands = action.payload
        })
        .addCase(getBrandList.rejected, (state, action) => {
          console.log("Error: ", action.error)
          state.status = "failed"
          state.error = action.error.message
        })
    }
  })
  
  export const selectCategoryBrands = (state) => state.brands.brands
  export const selectCategoryBrandsStatus = (state) => state.brands.status
  export const selectCategoryBrandsError = (state) => state.brands.error
  
  export default CategoryBrandsSlice.reducer