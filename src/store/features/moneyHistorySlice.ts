import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type MoneyItem = {
    id: number
    type: string
    title: string
    amount: number
    date: string
    time: string
    img: string
}

export const moneyAdapter = createEntityAdapter<MoneyItem>()
const initialState = moneyAdapter.getInitialState()

const moneyHisorySlice = createSlice({
    name: 'moneyHistory',
    initialState,

    reducers: {
        addItem: moneyAdapter.addOne,
        updateItem: moneyAdapter.upsertOne,
        deleteItem: moneyAdapter.removeOne,
    }
})

export const { addItem, updateItem, deleteItem } = moneyHisorySlice.actions
export default moneyHisorySlice.reducer
