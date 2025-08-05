const JWT = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).json({ msg: "Authentication Invalid" })
    }
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET)
      req.user = payload
      next()
    } catch (error) {
      return res.status(401).json({ msg: "Authentication Invalid" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" })
  }
}

module.exports = {
  authenticateUser,
}