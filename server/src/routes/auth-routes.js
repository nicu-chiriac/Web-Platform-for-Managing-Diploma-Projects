const { Router } = require('express')
const { getUsers, register, login, protected, logout } = require('../controllers/auth')
const { getStudentList, getSearchStudent, getStudent, addStudent, importStudentsCsv, updateStudent, deleteStudent } = require('../controllers/studenti')
const { userAuth } = require('../middlewares/auth-middleware')
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth-validators')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

router.get("/studentlist", userAuth, getStudentList, )
router.get("/search", userAuth, getSearchStudent)
router.get("/studentlist/:id", userAuth, getStudent)
router.post("/studentlist", userAuth, addStudent)
router.post("/studentlist/importcsv", userAuth, importStudentsCsv)
router.put("/studentlist/:id", userAuth, updateStudent)
router.delete("/studentlist/:id", userAuth, deleteStudent)

module.exports = router