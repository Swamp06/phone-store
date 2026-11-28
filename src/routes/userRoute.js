import { Router } from "express";
import authController from "../controllers/authController.js";
import auth from "../middleware/auth.js";


const userRouter = Router()

userRouter.post("/registration" , authController.register)
userRouter.post("/login", authController.login )
userRouter.get("/me" , auth.authUser , authController.getMe)

export default userRouter

