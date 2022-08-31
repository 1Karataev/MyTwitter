import axios from 'axios'
import {call, put, takeEvery} from 'redux-saga/effects'
import { setLoad, setTweets } from '../slice/Tweets'






function* getTweetsFetch () :any {
  const tweets = yield call(()=> axios.get('https://62a375d45bd3609cee6a9053.mockapi.io/tweets'))
  console.log('fdsgdfg')
  yield put(setTweets(tweets.data))
  yield put(setLoad(true))
}


export default function* sagaTweets () {
  takeEvery(setLoad.type, getTweetsFetch ())
}






