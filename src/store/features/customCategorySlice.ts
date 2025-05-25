import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CustomCategory = {
  title: string
  img: string
  type: string
}

type CustomCategoryState = {
  list: CustomCategory[]
}

const initialState: CustomCategoryState = {
  list: []
}

const customCategorySlice = createSlice({
  name: "customCategory",
  initialState,
  reducers: {
    addCustomCategory(state, action: PayloadAction<CustomCategory>) {
      state.list.push(action.payload)
    },
    removeCustomCategory(state, action: PayloadAction<CustomCategory>) {
      state.list = state.list.filter(
        cat =>
          !(
            cat.title === action.payload.title &&
            cat.img === action.payload.img &&
            cat.type === action.payload.type
          )
      )
    }
  }
})

export const { addCustomCategory, removeCustomCategory } = customCategorySlice.actions
export default customCategorySlice.reducer