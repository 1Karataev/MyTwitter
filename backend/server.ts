import express from 'express'
import { UserCrtl } from './controllers/UserControllers'
import { registerValidations } from './validations/register'
import { createTweetValidations } from './validations/createTweetValidations'
import {passport} from './core/passport'
import session from 'express-session'
import multer from 'multer'
import cors from 'cors'
import './core/db'
import { TweetCrtl } from './controllers/TweetControllers'
import { UploadFileCrtl } from './controllers/UploadFileControllers'


const app = express()

const storage = multer.memoryStorage()
const upload = multer({ dest: 'uploads/' })

app.use(express.json())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret' 
}));

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(passport.initialize())

app.use(passport.session());

app.get('/users',UserCrtl.index)
app.get('/users/me',passport.authenticate('jwt'), UserCrtl.getUserInfo)

app.get('/tweets', TweetCrtl.index)
app.get('/tweets/:id', TweetCrtl.show)
app.post('/tweets', passport.authenticate('jwt'), createTweetValidations, TweetCrtl.create)
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetValidations, TweetCrtl.update)
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCrtl.delete)

app.post('/auth/register',registerValidations, UserCrtl.create)
app.post('/auth/login',  passport.authenticate('local'),  UserCrtl.afterLogin)

app.post('/upload', upload.single('avatar'), UploadFileCrtl.index)

app.listen(9999,  ()=>{
 
  console.log('server runned')
})


