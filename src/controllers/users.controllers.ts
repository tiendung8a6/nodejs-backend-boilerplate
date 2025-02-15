import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

import userService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email == '' && password == '') {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  return res.json({ message: 'Login successful' })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.json({ message: 'User Register Success', result })
  } catch (error) {
    return res.status(400).json({ message: 'Failed Register' })
  }
}
