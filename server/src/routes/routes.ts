import { Router } from "express";
import { UserController } from "../controllers/userController";


const userController=new UserController()

export const router:Router=Router()

router.route('/register').post(userController.register.bind(userController))