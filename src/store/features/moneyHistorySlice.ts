import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MoneyItem = {
    id: number
    type: string
    title: string
    description: string
    amount: number
    originalAmount: number
    originalCurrency: string
    date: string
    time: string
    img: string
    color: string
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
        convertAllCurrencies: (state, action: PayloadAction<{targetCurrency: string, rates: Record<string, number>}>) => {
            const { targetCurrency, rates } = action.payload
            Object.values(state.entities).forEach(item => {
                if (item && item.originalCurrency !== targetCurrency) {
                    const rate = rates[item.originalCurrency.toLowerCase()]
                    if (rate) {
                        item.amount = Math.round(item.originalAmount * rate)
                    }
                } else if (item && item.originalCurrency === targetCurrency) {
                    item.amount = item.originalAmount
                }
            })
        }
    }
})

export const { addItem, updateItem, deleteItem, convertAllCurrencies } = moneyHisorySlice.actions
export default moneyHisorySlice.reducer
