import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const moneyAdapter = createEntityAdapter()
const initialState = moneyAdapter.getInitialState()


const moneyHisorySlice = createSlice({
    name: 'moneyHistory',
    initialState,

    reducers:{
        addItem: moneyAdapter.addOne,
        editItem: moneyAdapter.upsertOne,
        deleteItem: moneyAdapter.removeOne,
    }
})

export const {addItem, editItem, deleteItem} = moneyHisorySlice.actions
export default moneyHisorySlice.reducer
