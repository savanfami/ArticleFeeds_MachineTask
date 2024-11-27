import { UserFactory } from "../factory/user.factory";
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from "../utils/errorResponse";
import { generateToken } from "../utils/generateToken";
import { ModifiedRequest } from "../middlewares/jwtVerify";

export class UserController {
  private userService = UserFactory.createUserFactory()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body
      let user = await this.userService.register(data)
      if (!user) {
        throw ErrorResponse.badRequest('Failed to register')
      }
      let token = generateToken({ id: user._id })
      res.status(200).cookie('User', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 60 * 60 * 24 * 1000 * 12 })
        .json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body
      let user = await this.userService.login(data)
      if (!user) {
        throw ErrorResponse.badRequest('Password is incorrect')
      }
      let token = generateToken({ id: user._id })
      res.status(200)
        .cookie('User', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 60 * 60 * 24 * 1000 * 12 })
        .json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('User', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      res.status(200).json({ message: "logout successfull", success: true })
    } catch (error) {
      next(error)
    }
  }
  async getUser(req: ModifiedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.user
      const data = await this.userService.getUser(id)
      res.status(200).json({ success: true, data })
    } catch (error) {
      next(error)
    }
  }
  async updateProfile(req: ModifiedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.user
      const { data } = req.body
      const result = await this.userService.updateProfile(id, data)
      if (!result) {
        throw ErrorResponse.badRequest('Couldnt updted profile')
      }
      res.status(200).json({ success: true, data: result, message: 'updated successfully' })
    } catch (error) {
      next(error)
    }
  }
  async updatePassword(req: ModifiedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.user
      const { data } = req.body
      const result = await this.userService.updatePassword(id, data)
      if (!result) {
        throw ErrorResponse.badRequest('Couldnt update password')
      }
      res.status(200).json({ success: true, data: result, message: 'updated successfully' })
    } catch (error) {
      next(error)
    }
  }
  async updatePreference(req: ModifiedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.user
      const { data } = req.body
      const result = await this.userService.updatePreference(id, data)
      if (!result) {
        throw ErrorResponse.badRequest('Couldnt update preference')
      }
      res.status(200).json({ success: true, data: result, message: 'updated successfully' })
    } catch (error) {
      next(error)
    }
  }



}