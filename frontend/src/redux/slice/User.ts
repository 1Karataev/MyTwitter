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
type IUserSlcie = {
  user: User | null,
  isAuth:boolean
}

const initialState: IUserSlcie = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth(state, action:PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action:PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const {setIsAuth, setUser} = userSlice.actions;
export default userSlice.reducer;


