import { Router } from 'express'
const usersRouter = Router()
usersRouter.get('/hello', (req, res) => {
  res.send('Hello!')
})
export default usersRouter
