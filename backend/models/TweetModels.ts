import {Document, model, Schema} from 'mongoose'


export interface TweetModel  {
  _id?: String,
  text: String,
  user: String | undefined
}

export type TweetModelDocument = TweetModel & Document

const TweetSchema = new Schema<TweetModel>({
  text:{
    unique:true,
    required:true,
    type: String
  },

  user:{
    required:true,
    type: Schema.Types.ObjectId, ref: 'User'
  },

})

export const  tweetModel = model('Tweet', TweetSchema)