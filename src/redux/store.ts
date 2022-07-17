import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import tweets from './slice/Tweets'

export const store = configureStore({
  reducer:{
    tweets
  }
})


export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>