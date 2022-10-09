import express from 'express'
import { UserCrtl } from './controllers/UserControllers'
import { registerValidations } from './controllers/validations/register'
import {passport} from './core/passport'
import session from 'express-session'

import './core/db'


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

app.post('/auth/register',registerValidations, UserCrtl.create)

app.post('/auth/login',  passport.authenticate('local'),UserCrtl.afterLogin)

app.listen(9999,  ()=>{
 
  console.log('server runned')
})



