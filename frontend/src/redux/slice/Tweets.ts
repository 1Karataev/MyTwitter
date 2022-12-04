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
  tweet: Tweet[],
  load:boolean | null
}

export const fetchTweets = createAsyncThunk<[Tweet]>(
  'users/fetchTweets',
  async  () => {
    setLoad(true)
    const  response  = await axios.get('/tweets')
    return response.data
    
  }
)

const initialState: ArrayTweet = {
  tweet: [],
  load: null
}

const tweetSlice = createSlice({
  name:'tweets',
  initialState,
  reducers:{
    setLoad(state, action:PayloadAction<boolean>){
      state.load = action.payload
    },
    setTweets(state, action:PayloadAction<[Tweet]>){
      state.tweet = action.payload
      state.load = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTweets.fulfilled, (state, action: any) => {
      state.tweet = action.payload.data
      state.load = false
    })
  },
})

export const {setLoad, setTweets } = tweetSlice.actions
export default tweetSlice.reducer


