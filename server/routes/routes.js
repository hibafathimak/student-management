const express = require('express')
const router = new express.Router()
const studentController = require('../controllers/studentControllers')
const teacherController = require('../controllers/teacherControllers')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

router.post('/register', teacherController.registerController)
router.post('/login', teacherController.loginController)
router.post('/student/add', jwtMiddleware, studentController.addStudentController)
router.put('/student/edit/:id', jwtMiddleware, studentController.editStudentController)
router.delete('/student/delete/:id', jwtMiddleware, studentController.deleteStudentController)
router.get('/all-students', jwtMiddleware, studentController.getAllStudentsController)
router.get('/student/:id', jwtMiddleware, studentController.getStudentController)

module.exports=router