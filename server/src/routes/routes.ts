import { Router } from "express";
import { UserController } from "../controllers/userController";
import { ModifiedRequest, verify } from "../middlewares/jwtVerify";
import { ArticleController } from "../controllers/articleController";


const userController = new UserController()
const articleController = new ArticleController()
export const router: Router = Router()

//user routes

router.route('/register').post(userController.register.bind(userController))
router.route('/login').post(userController.login.bind(userController))
router.route('/logout').post(userController.logout.bind(userController))
router.route('/user').get(verify, (req, res, next) => userController.getUser(req as ModifiedRequest, res, next))
router.route('/profile').put(verify, (req, res, next) => userController.updateProfile(req as ModifiedRequest, res, next))
router.route('/updatepassword').put(verify, (req, res, next) => userController.updatePassword(req as ModifiedRequest, res, next))
router.route('/updatepreference').patch(verify, (req, res, next) => userController.updatePreference(req as ModifiedRequest, res, next))

//article routes
router.route('/create').post(verify, (req, res, next) => articleController.createArticle(req as ModifiedRequest, res, next))
router.route('/article').get(verify, (req, res, next) => articleController.getArticlesByUser(req as ModifiedRequest, res, next))
router.route('/article/:articleId').put(verify, (req, res, next) => articleController.editArticleByUser(req as unknown as ModifiedRequest, res, next))
    .delete(verify, (req, res, next) => articleController.deleteArticleByUser(req as unknown as ModifiedRequest, res, next));
router.route('/articlepreference').get(verify, (req, res, next) => articleController.getArticlesByPreference(req as unknown as ModifiedRequest, res, next))
router.route('/interact').post(verify, (req, res, next) => articleController.getUserInteractions(req as ModifiedRequest, res, next))