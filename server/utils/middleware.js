import jwt from 'jsonwebtoken'
import user from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()
export const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path ', request.path)
  console.log('Body ', request.body)
  console.log('---')
  next()
}

export const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown endpoint' })
}

export const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  next(error)
}

export const userExtractor = async (request, response, next) => {
  let userFind = null
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      userFind = await user.findById(decodedToken.id)
    }
  } catch (err) {
    console.error('Error verifying token', err)
  }
  request.user = userFind
  next()
}
export const tokenExtractor = (request, response, next) => {
  const decodedToken = request.get('authorization')
  if (decodedToken && decodedToken.startsWith('Bearer ')) {
    request.token = decodedToken.substring(7)
  } else {
    request.token = null
  }
  next()
}