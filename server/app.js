import express from 'express'
import mongoose from 'mongoose'
const app = express()
import cors from 'cors'
import { MONGODB_URI } from '../config/common.js'
import blogRouter from './controllers/blogs.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor } from './utils/middleware.js'

mongoose.set('strictQuery', false)
console.log('Connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

export default app