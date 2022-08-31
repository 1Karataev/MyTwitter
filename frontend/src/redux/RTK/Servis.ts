import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Tweet } from '../slice/Tweets'




export const postApi = createApi({
  reducerPath:'postApi',
  baseQuery:fetchBaseQuery({baseUrl:'https://62a375d45bd3609cee6a9053.mockapi.io/'}),
  endpoints:(builder)=>({
    getPost:builder.query<[Tweet],any>({
      query:()=> `tweets`
    })
  }),
})

export const {   useLazyGetPostQuery } = postApi