
const JWT = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: "Email already registered"
            })
        }

        const user = await User.create({ username, email, password })

        res.status(201).json({
            success: true,
            user,
            msg: "User registered successfully"
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            msg: "Something went wrong"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "Please provide email and password"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Invalid credentials"
            })
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                msg: "Invalid credentials"
            })
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2d"
        })

        delete user.password

        res.status(200).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            msg: "Something went wrong"
        })
    }
}

module.exports = {
    register,
    login
}