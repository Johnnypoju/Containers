const blogRouters = require("express").Router()
require("express-async-errors")
const Entry = require("../models/entry")
const User = require("../models/user")
const logger = require("../utils/logger")
const jwt = require("jsonwebtoken")
const { request } = require("express")

const tokenCheck = async (request) => {
	if (!request.token || !request.user) {
		logger.error("401")
		return response.status(401).json({ error: "token missing or invalid" })
	}
}
//GET all blog entries
blogRouters.get("/", async (request, response) => {
	const blogs = await Entry.find({}).populate("userId", {
		username: 1,
		name: 1,
	})
	response.json(blogs.map((blogs) => blogs.toJSON()))
})

//POST a new blog entry
blogRouters.post("/", async (request, response) => {
	const Blog = await new Entry(request.body)
	console.log(request.user)
	//Check if token or user id present

	tokenCheck(request)

	const user = await User.findById(request.user)

	if (Blog.likes === undefined) {
		Blog.likes = 0
	}

	Blog.userId = request.user

	const savedBlog = await Blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)

	//logger.info(user)
	await user.save()

	response.json(savedBlog.toJSON())
})

//DELETE a blog entry by id
blogRouters.delete("/:id", async (request, response) => {
	console.log(request.params)
	const blog = await Entry.findById(request.params.id)

	const user = await User.findById(request.user)

	const tokenVerify = await tokenCheck(request)

	blog.delete()

	const blogIndex = user.blogs.indexOf(blog.id)
	user.blogs.splice(blogIndex, 1)
	user.save()
	logger.info(`Blog ${blog.title} has been deleted.`)
	response.json((result) => response.status(200).json(result))
})

//modify blog entry likes by id
blogRouters.put("/:id", async (request, response) => {
	const entryBody = request.body

	//logger.info(entryBody)

	const updatedBlog = await Entry.findByIdAndUpdate(request.params.id, {
		likes: entryBody.likes,
	})
	logger.info(updatedBlog)
	response.status(200).json(updatedBlog.toJSON())
})

blogRouters.post("/:id/comments", async (request, response) => {
	const entryBody = request.body
	logger.info(entryBody)

	const updatedBlog = await Entry.findByIdAndUpdate(request.params.id, {
		comments: entryBody.comments
	})

	logger.info(updatedBlog)
	response.status(200)
})

module.exports = blogRouters
