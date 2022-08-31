import express from 'express'


const app = express()

app.get('/users',(req: express.Request, res:express.Response)=> {
  res.send('privet')
})

app.listen(9999,  ()=>{
 
  console.log('server runned')
})