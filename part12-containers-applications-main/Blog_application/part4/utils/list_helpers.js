const User = require("../models/user")

const dummy = (blogs) => {
	return 1
}

const initialBlog = [
	{
		title: "Call of Cthulhu",
		author: "H.P. Lovercraft",
		url: "google.com",
		likes: 9000,
		userId: "",
	},
	{
		title: "Harry Potter",
		author: "J.K. Rowling",
		url: "harry_potter.org",
		likes: 1557,
		userId: "",
	},
]

const totalLikes = (blogs) => {
	let likeSum = 0
	for (const entry of blogs) {
		likeSum += entry.likes
	}
	return likeSum
}

const favoriteBlog = (blogs) => {
	let highestLikes = 0
	let favoriteEntry = {}
	for (const entry of blogs) {
		if (entry.likes > highestLikes) {
			highestLikes = entry.likes
			favoriteEntry = entry
		}
	}
	return favoriteEntry
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map((u) => u.toJSON())
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	initialBlog,
	usersInDb,
}
