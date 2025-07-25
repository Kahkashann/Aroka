import express from "express"
import connectDB from "./db/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import userRoute from "./route/user.route.js"

const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
)

//route
app.use("/api/auth", userRoute)


connectDB()
app.listen(PORT, () => {
	console.log("Server is running on port 3000")
})

