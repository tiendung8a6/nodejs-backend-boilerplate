import { IsISO8601Options } from './../../node_modules/express-validator/lib/options.d'
import { Request, Response, NextFunction } from 'express'
import { ParamSchema, checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware executed')
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 1, max: 100 }
      },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      normalizeEmail: true,
      custom: {
        options: async (value: string) => {
          const emailExist = await userService.checkEmailExist(value)
          if (emailExist) {
            throw new Error('Email already exists')
          }
          return true
        }
      }
    },
    password: {
      isString: true,
      notEmpty: true,
      isLength: {
        options: { min: 6, max: 50 }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10
        },
        errorMessage:
          'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      }
    },
    confirm_password: {
      isString: true,
      notEmpty: true,
      isLength: {
        options: { min: 6, max: 50 }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10
        },
        errorMessage:
          'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      },
      custom: {
        options: (value: string, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
