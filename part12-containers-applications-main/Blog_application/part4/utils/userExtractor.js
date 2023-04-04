const jwt = require("jsonwebtoken")

const getUserFrom = async (request, response, next) => {
	const user = request.token
	const decodedToken = jwt.verify(user, process.env.SECRET)

	request.user = decodedToken.id

	next()
}

module.exports = {
	getUserFrom: getUserFrom,
}
