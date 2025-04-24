const teachers = require('../models/teacherModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json("All fields are required!!")
    }
    try {
        const existingEmail = await teachers.findOne({ email })
        if (existingEmail) {
           return res.status(409).json("Email already registered! Please Login")
        } else {
        const hashedPassword = await bcrypt.hash(password,10)
            const newUser = teachers({
                name, email, password: hashedPassword
            })
            await newUser.save()
            res.status(201).json("Registration Successful! Please Login")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

exports.loginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json("All fields are required!!")
    }
    try {
        const existingUser = await teachers.findOne({ email })
        if (existingUser) {
            const passwordMatch = await bcrypt.compare(password, existingUser.password)
            if (!passwordMatch) {
                return res.status(401).json("Invalid credentials. Please check your email and password.")
            } else {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
                res.status(200).json({ name: existingUser.name,email:existingUser.email, token })
            }
        } else {
            res.status(404).json("User not found. Please register first!")
        }
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}