import jwt from 'jsonwebtoken'
const { sign } = jwt
import pkg from 'bcryptjs'
const { compare } = pkg
import User from '../models/user.js'
import express from 'express'
const loginRouter = express.Router()

loginRouter.post('/', async(request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username: username })
  const passwordCorrect= user === null
    ? false
    : await compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(400).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user._id
  }
  const token = sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .send({ token: token, username: user.username, name: user.name })
})

export default loginRouter