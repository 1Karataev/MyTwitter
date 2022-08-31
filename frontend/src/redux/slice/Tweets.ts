import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'



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
  tweet: [Tweet|null],
  load:boolean | null
}

export const fetchTweets = createAsyncThunk<[Tweet]>(
  'users/fetchTweets',
  async  () => {
    setLoad(false)
    const  response  = await axios.get('https://62a375d45bd3609cee6a9053.mockapi.io/tweets')
    return response.data
    
  }
)

const initialState: ArrayTweet = {
  tweet: [null],
  load: null
}

const tweetSlice = createSlice({
  name:'tweets',
  initialState,
  reducers:{
    setLoad(state, action:PayloadAction<boolean>){
      state.load = action.payload
    },
    setTweets(state, action:PayloadAction<[Tweet | null]>){
      state.tweet = action.payload
      state.load = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTweets.fulfilled, (state, action) => {
      state.tweet = action.payload
      state.load = true
    })
  },
})

export const {setLoad, setTweets } = tweetSlice.actions
export default tweetSlice.reducer


