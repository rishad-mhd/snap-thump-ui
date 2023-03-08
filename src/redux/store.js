import { configureStore } from '@reduxjs/toolkit'
import thumbnailReducer from './slices/thumbnailSlice'

export const store = configureStore({
  reducer: {
    thumbnail:thumbnailReducer
  },
})