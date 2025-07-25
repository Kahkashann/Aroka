import express from "express"
import { loginUser, registerUser, getMyProfile, logoutUser } from "../controller/user.controller.js"
import protectRoute from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post("/logout", logoutUser)
router.get("/me", protectRoute, getMyProfile)

export default router