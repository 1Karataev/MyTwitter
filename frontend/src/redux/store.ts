import { configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import sagaTweets from "./saga/sagaTweet";
import tweets from './slice/Tweets';
import user from './slice/User';
import {postApi} from './RTK/Servis';

const saga = createSagaMiddleware()

export const store = configureStore({
  reducer:{
    tweets,
    user,
    [postApi.reducerPath]:postApi.reducer
  },
   middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(postApi.middleware),
})


export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>