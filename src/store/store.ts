import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./features/categorySlice"
import moneyHistoryReducer from "./features/moneyHistorySlice"
import selectedMoneyItemReducer from "./features/selectedMoneyActionSlice"

function getMoneyState() {
  const moneyHistory = localStorage.getItem("moneyHistory")
  const category = localStorage.getItem("category")
  return {
    moneyHistory: moneyHistory ? JSON.parse(moneyHistory) : undefined,
    category: category ? JSON.parse(category) : undefined,
  }
}

function saveMoneyState(state: any) {
  localStorage.setItem("moneyHistory", JSON.stringify(state.moneyHistory))
  localStorage.setItem("category", JSON.stringify(state.category))
}

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    moneyHistory: moneyHistoryReducer,
    selectedMoneyItem: selectedMoneyItemReducer,
  },
  preloadedState: getMoneyState()
})

store.subscribe(() => {
  saveMoneyState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch