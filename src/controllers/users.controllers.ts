import { Request, Response } from 'express'
import userService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email == '' && password == '') {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  return res.json({ message: 'Login successful' })
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })
    return res.json({ message: 'User Register Success', result })
  } catch (error) {
    return res.status(400).json({ message: 'Failed Register' })
  }
}
