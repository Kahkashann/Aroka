import mongoose from "mongoose";

const connectDB = () => {
	try {
		mongoose.connect(process.env.MONGO_URI)
		console.log("Database connected")
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

export default connectDB