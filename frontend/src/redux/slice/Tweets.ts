import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';



export interface User {
  fullname: string,
  username:string,
  avatarURL:string
}

export interface Tweet {
  _id:string,
  text:string, 
  user: User
}
type ArrayTweet = {
  tweet: Tweet[],
  load:boolean | null
}

const initialState: ArrayTweet = {
  tweet: [],
  load: null,
};

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    setLoad(state, action:PayloadAction<boolean>) {
      state.load = action.payload;
    },
    setTweets(state, action:PayloadAction<[Tweet]>) {
      state.tweet = action.payload;
      state.load = true;
    },
  },
});

export const {setLoad, setTweets} = tweetSlice.actions;
export default tweetSlice.reducer;


