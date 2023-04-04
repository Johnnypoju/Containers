const mongoose = require("mongoose")
const supertest = require("supertest")
const list_helpers = require("../utils/list_helpers")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/entry")

let token = ""
let user = {}

beforeAll(async () => {
	const auth = await api
		.post("/api/login")
		.send({ username: "root", password: "sekret" })
	token = auth.body.token

	user = await list_helpers.usersInDb()
})

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = list_helpers.initialBlog.map(
		(blog) => new Blog({ ...blog, userId: user[0].id })
	)
	const promiseArray = blogObjects.map(async (blog) => {
		await blog.save()
	})

	await Promise.all(promiseArray)
})

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

test("blogs contain id field", async () => {
	const response = await api
		.get("/api/blogs")
		.set("Authorization", `bearer ${token}`)
	expect(response.body[0].id).toBeDefined()
})

test("add blog entries", async () => {
	const newEntry = {
		title: "Lord of the Rings",
		author: "J.R.R. Tolkien",
		url: "LOTR PWNS",
		userId: "61bdf2fa5fd491578b6276d8",
	}

	await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.send(newEntry)
		.expect(200)
		.expect("Content-Type", /application\/json/)

	const response = await api
		.get("/api/blogs")
		.set("Authorization", `bearer ${token}`)

	const title = response.body.map((r) => r.title)
	const author = response.body.map((r) => r.author)
	const url = response.body.map((r) => r.url)
	expect(response.body).toHaveLength(list_helpers.initialBlog.length + 1)
	expect(title).toContainEqual("Lord of the Rings")
	expect(author).toContainEqual("J.R.R. Tolkien")
	expect(url).toContainEqual("LOTR PWNS")
})

test("add malformed entry", async () => {
	const noTitle = {
		author: "J.R.R. Tolkien",
		url: "LOTR PWNS",
	}
	const noUrl = {
		title: "Lord of the Rings",
		author: "J.R.R. Tolkien",
		userId: user[0].id,
	}

	await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.send(noTitle)
		.expect(400)
		.expect("Content-Type", /application\/json/)

	await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.send(noUrl)
		.expect(400)
		.expect("Content-Type", /application\/json/)
})

test("delete entry", async () => {
	const entries = await api
		.get("/api/blogs")
		.set("Authorization", `bearer ${token}`)

	const entryId = entries.body[0].id
	const path = `/api/blogs/${entryId}`

	await api
		.delete(path)
		.set("Authorization", `bearer ${token}`)
		.expect(200)
		.expect("Content-Type", /application\/json/)

	const response = await api
		.get("/api/blogs")
		.set("Authorization", `bearer ${token}`)

	expect(response.body).toHaveLength(1)
})

test("increase likes", async () => {
	const entries = await api
		.get("/api/blogs")
		.set("Authorization", `bearer ${token}`)

	const entryId = entries.body[0].id
	const path = `/api/blogs/${entryId}`

	entries.body[0].likes = "100"

	await api
		.put(path)
		.set("Authorization", `bearer ${token}`)
		.send(entries.body[0])
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

afterAll(() => {
	mongoose.connection.close()
})
