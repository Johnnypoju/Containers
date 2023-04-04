const userRouters = require("express").Router()
require("express-async-errors")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const logger = require("../utils/logger")

userRouters.post("/", async (request, response) => {
	const body = request.body
	if (body.password.length < 3) {
		return response.status(401).json({
			error: "password length under 3 characters",
		})
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	await user.save()

	response.json((result) => response.status(200).json(result))
})

userRouters.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs")

	response.json(users.map((u) => u.toJSON()))
})

userRouters.get("/userlist", async (request, response) => {
	console.log('test')
	const users = await User.find()
	response.json(users.map((obj) => obj.toJSON()))
} )

module.exports = userRouters
