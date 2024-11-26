import express from 'express'
import router from './router'

const app = express()

//app.use, cada que se hace una peticion usara la de el file
app.use('/api', router)

//leer datos de formularios
app.use(express.json())


export default app