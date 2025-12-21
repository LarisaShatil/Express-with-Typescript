import express from 'express'
import type {Express} from 'express'

import { pets } from './data/pets'

const PORT:number = 8000;
const app: Express = express()



app.get('/', (req, res) => {
  res.json(pets)
})

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`)
})