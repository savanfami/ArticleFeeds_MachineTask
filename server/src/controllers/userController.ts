import { UserFactory } from "../factory/user.factory";
import { Request, Response,NextFunction } from 'express';
import ErrorResponse from "../utils/errorResponse";
import { generateToken } from "../utils/generateToken";

export class UserController{
   private userService=UserFactory.createUserFactory()
    async register(req:Request,res:Response,next:NextFunction){
      try {
        const { data } = req.body
        let user=await this.userService.register(data)
        if (!user) {
          throw ErrorResponse.badRequest('Failed to register')
      }
      let token = generateToken({ id: user._id })
      res.status(200).cookie('User',token,{ httpOnly: true, sameSite: 'none', secure: true, maxAge: 60 * 60 * 24 * 1000 * 12 })
      .json({success:true,data:user})
      } catch (error) {
        console.log(error)
        // next(error)
      }
    }
}