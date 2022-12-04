import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../core/axiosBaseQuery'
import { Tweet } from '../slice/Tweets'




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
    

  }),
})

export const {  useLazyGetPostQuery, useLazyGetPostsQuery, useAddTweetMutation } = postApi