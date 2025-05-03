import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "./features/categorySlice"
import moneyHistoryReducer from "./features/moneyHistorySlice"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    moneyHisory: moneyHistoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch