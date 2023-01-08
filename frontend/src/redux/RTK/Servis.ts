import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../core/axiosBaseQuery'
import { Tweet } from '../slice/Tweets'

export interface ILogin {
  userName: string;
  password: string;
};

interface IUserInfo {
    _id?: string,
  email: string,
  fullname:string
  username:string,
  password:string,
  confirm_hash:string,
  token: string,
}


export const postApi = createApi({
  reducerPath:'postApi',
  baseQuery:axiosBaseQuery({baseUrl:'http://localhost:9999/'}),
  tagTypes:["POST"],
  endpoints:(builder)=>({
    getPosts:builder.query<{sucsess: string, data: [Tweet]}, any>({
      query:()=> ({
        url:`tweets`,
        method: 'GET'
      }),
      providesTags: result => ['POST']
    }), 

     getPost:builder.query<{sucsess: string, data: Tweet}, any>({
      query:(id: string)=> ({
        url:`tweets/${id}`,
        method: 'GET'
      }),
      providesTags: result => ['POST']
    }), 

    addTweet:builder.mutation<Tweet, Tweet>({
      query:(tweet: Tweet)=>({
        url:'tweets',
        method:'POST',
        data: tweet
      }),
      invalidatesTags:['POST']
    }),

     login:builder.mutation<{status: string, data: IUserInfo} , ILogin>({
      query:(data)=>({
        url:'auth/login',
        method:'POST',
        data:data
      }),
      invalidatesTags:['POST']
    }),

    register:builder.mutation<{status: string, data: IUserInfo}, ILogin>({
      query:(data)=>({
        url:'auth/register',
        method:'POST',
        data:data
      }),
      invalidatesTags:['POST']
    }),
    

  }),
})

export const {  useLazyGetPostQuery, useLazyGetPostsQuery, useAddTweetMutation,  useLoginMutation, useRegisterMutation} = postApi