import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI as string

mongoose.set('strictQuery', true).connect(url, { useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export {db, mongoose}

