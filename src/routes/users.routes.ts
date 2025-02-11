import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidation, registerValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/login', loginValidation, loginController)

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
// router.post('/register', validator.registerValidator, wrapRequestHandler(controller.register))
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
