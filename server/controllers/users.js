import User from '../models/user.js'
import express from 'express'
const userRouter = express.Router()
import pkg from 'bcryptjs'
const { hash } = pkg

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { 'title': 1, 'url': 1, 'likes': 1, 'author': 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(username.length <= 3){
    return response.status(400).send({ error: 'username length less than 3' })
  }
  if(password.length <= 3){
    return response.status(400).send({ error: 'password length less than 3' })
  }


  const passwordHash = await hash(password, 10)

  const user = new User({
    'username': username,
    'name': name,
    passwordHash,
  })

  const userSaved = await user.save()
  response.json(userSaved)
})

export default userRouter