import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type MoneyItem = {
    id: number
    type: string
    title: string
    amount: number
    date: string
}

export const moneyAdapter = createEntityAdapter<MoneyItem>()
const initialState = moneyAdapter.getInitialState()

const moneyHisorySlice = createSlice({
    name: 'moneyHistory',
    initialState,

    reducers: {
        addItem: moneyAdapter.addOne,
        editItem: moneyAdapter.upsertOne,
        deleteItem: moneyAdapter.removeOne,
    }
})

export const { addItem, editItem, deleteItem } = moneyHisorySlice.actions
export default moneyHisorySlice.reducer
