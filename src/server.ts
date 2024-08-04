import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db'
import { authRouther } from './routes/auth.routes'


dotenv.config()
connectDB()

const app = express()
app.use(cors())

// Logging
//app.use(morgan('dev'))

// Leer datos de formularios
app.use(express.json())

// Routes
app.use('/api/auth', authRouther)
//app.use('/api/projects', projectRoutes)

export default app