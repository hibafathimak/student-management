const students = require('../models/studentModel')

exports.addStudentController = async (req,res) => {
    const { name, age, grade, email } = req.body
    if (!name || !age || !grade || !email) {
        return res.status(400).json("All fields are required!")
    }
    try {
        const existingStudent = await students.findOne({ email }) 
        if (existingStudent) {
            return res.status(409).json("Student Already Exists!")
        }
        const newStudent = students({
            name, age, grade, email 
        })
        await newStudent.save()
        res.status(201).json("Student Added Successfully!")
        // res.status(201).json(newStudent)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

exports.getAllStudentsController = async (req,res) => {
    try {
        const allStudents = await students.find()
        res.status(200).json(allStudents)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

exports.getStudentController = async (req, res) => {
    const { id } = req.params
        try {
            const existingStudent = await students.findById(id)
            if (!existingStudent) {
                 return res.status(404).json("Student Not Exists!")
            }
            res.status(200).json(existingStudent)
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

exports.editStudentController = async (req,res) => {
    const { name, age, grade, email } = req.body
    const { id } = req.params
    if (!name || !age || !grade || !email) {
        return res.status(400).json("All fields are required!")
    }
    try {
        const existingStudent = await students.findById(id) 
        if (!existingStudent) {
            return res.status(404).json("Student Not Exists!")
        }
        await students.findByIdAndUpdate(id,{
            name, age, grade, email 
        },{new:true})
        res.status(200).json("Student Updated Successfully!")
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

exports.deleteStudentController = async (req,res) => {
    const { id } = req.params
    try {
        const existingStudent = await students.findById(id)
        if (!existingStudent) {
             return res.status(404).json("Student Not Exists!")
        }
        await students.findByIdAndDelete(id)
        res.status(200).json("Student Deleted Successfully")
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}