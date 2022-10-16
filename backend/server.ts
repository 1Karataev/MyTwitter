import express from 'express'
import { UserCrtl } from './controllers/UserControllers'
import { registerValidations } from './validations/register'
import { createTweetValidations } from './validations/createTweetValidations'
import {passport} from './core/passport'
import session from 'express-session'

import './core/db'
import { TweetCrtl } from './controllers/TweetControllers'


const app = express()

app.use(express.json())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret' 
}));

app.use(passport.initialize())

app.use(passport.session());

app.get('/users',UserCrtl.index)
app.get('/users/me',passport.authenticate('jwt'), UserCrtl.getUserInfo)

app.get('/tweets', TweetCrtl.index)
app.get('/tweets/:id', TweetCrtl.show)
app.post('/tweets', passport.authenticate('jwt'), createTweetValidations, TweetCrtl.create)
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCrtl.delete)

app.post('/auth/register',registerValidations, UserCrtl.create)
app.post('/auth/login',  passport.authenticate('local'),UserCrtl.afterLogin)

app.listen(9999,  ()=>{
 
  console.log('server runned')
})



