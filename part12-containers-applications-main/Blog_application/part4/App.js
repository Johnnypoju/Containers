const blogRouter = require("./controllers/entries")
const userRouter = require("./controllers/users")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const loginRouter = require("./controllers/login")
const config = require("./utils/config")
const tokenExtractor = require("./utils/tokenExtractor")
const userExtractor = require("./utils/userExtractor")

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(tokenExtractor.getTokenFrom)
app.use("/api/blogs", userExtractor.getUserFrom, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

const errorHandler = (error, _request, response, next) => {
	if (error.name === "CastError") {
		console.log(error.message)
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		console.log(error.message)
		return response.status(400).send({ error: error.message })
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({
			error: "invalid token",
		})
	} else if (error.name === "TokenExpiredError") {
		return response.status(401).json({
			error: "token expired",
		})
	} else if (error.name === "TypeError") {
		return response.status(401).json({
			error: "Data could not be found",
		})
	}

	logger.error(error.message)

	next(error)
}

app.use(errorHandler)

module.exports = app
