import express from 'express'
import { UserCrtl } from './controllers/UserControllers'
import { registerValidations } from './controllers/validations/register'
import './core/db'

const app = express()

app.get('/users',UserCrtl.index)

app.post('/users',registerValidations, UserCrtl.create)

app.listen(9999,  ()=>{
 
  console.log('server runned')
})