import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
    category: string
}

const initialState: CategoryState = {
    category:'Income'
}

export const categorySlice = createSlice({
    name: 'selectedCategory',
    initialState,
    reducers:{
setCategory(state, action: PayloadAction<string>){
    state.category = action.payload
}}})

export const {setCategory} = categorySlice.actions
export default categorySlice.reducer