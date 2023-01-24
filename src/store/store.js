/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit'
import housesReducer from './house.slice'

export const store = configureStore({
  reducer: {
    houses: housesReducer,
  },
})
