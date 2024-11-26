import express from 'express'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app = express()
connectDB()

//app.use, cada que se hace una peticion usara la de el file
app.use('/api', router)

//leer datos de formularios
app.use(express.json())


export default app