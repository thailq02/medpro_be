import express from 'express'
import {config} from 'dotenv'
config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
