import {Document, model, Schema} from 'mongoose';


export interface TweetModel {
  _id?: String,
  text: String,
  user: String | undefined,
  images: Array<string>,
}

export type TweetModelDocument = TweetModel & Document

const TweetSchema = new Schema<TweetModel>({
  text: {
    unique: true,
    required: true,
    type: String,
  },

  user: {
    required: true,
    type: Schema.Types.ObjectId, ref: 'User',
  },
  images: Array<string>,

});

export const tweetModel = model('Tweet', TweetSchema);
