import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./features/categorySlice"
import moneyHistoryReducer from "./features/moneyHistorySlice"
import selectedMoneyItemReducer from "./features/selectedMoneyActionSlice"
import customCategoryReducer from "./features/customCategorySlice"
import searchReducer from "./features/searchSlice"
import currencyReducer from "./features/currencySlice"

function getMoneyState() {
  const moneyHistory = localStorage.getItem("moneyHistory")
  const category = localStorage.getItem("category")
  const customCategory = localStorage.getItem("customCategory")
  const currency = localStorage.getItem("currency")
  return {
    moneyHistory: moneyHistory ? JSON.parse(moneyHistory) : undefined,
    category: category ? JSON.parse(category) : undefined,
    customCategory: customCategory ? JSON.parse(customCategory) : undefined,
    currency: currency ? JSON.parse(currency) : undefined,
  }
}

function saveMoneyState(state: RootState) {
  localStorage.setItem("moneyHistory", JSON.stringify(state.moneyHistory))
  localStorage.setItem("category", JSON.stringify(state.category))
  localStorage.setItem("customCategory", JSON.stringify(state.customCategory))
  localStorage.setItem("currency", JSON.stringify(state.currency))
}

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    moneyHistory: moneyHistoryReducer,
    selectedMoneyItem: selectedMoneyItemReducer,
    customCategory: customCategoryReducer,
    search: searchReducer,
    currency: currencyReducer,
  },
  preloadedState: getMoneyState()
})

store.subscribe(() => {
  saveMoneyState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch