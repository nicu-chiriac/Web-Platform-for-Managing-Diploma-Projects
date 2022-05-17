const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { userAuth } = require('../middlewares/auth-middleware');
const { getStudentList, getSearchStudent, getStudent, addStudent, importStudentsCsv, updateStudent, deleteStudent } = require('../controllers/studenti');
const { getProfessorsList, getSearchProfessor, getProfessor, addProfessor, importProfessorsCsv, updateProfessor, deleteProfessor } = require('../controllers/profesori');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { registerValidation, loginValidation } = require('../validators/auth-validators');
const { getTemeList, getTema, addTema, updateTema, deleteTema, importTitluriTemeCsv } = require('../controllers/teme');
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

router.get("/studentlist", userAuth, getStudentList )
router.get("/searchstudent", userAuth, getSearchStudent)
router.get("/studentlist/:id", userAuth, getStudent)
router.post("/studentlist", userAuth, addStudent)
router.post("/studentlist/importcsv", userAuth, importStudentsCsv)
router.put("/studentlist/:id", userAuth, updateStudent)
router.delete("/studentlist/:id", userAuth, deleteStudent)

router.get("/professorlist", userAuth, getProfessorsList )
router.get("/searchprofessor", userAuth, getSearchProfessor)
router.get("/professorlist/:id", userAuth, getProfessor)
router.post("/professorlist", userAuth, addProfessor)
router.post("/professorlist/importcsv", userAuth, importProfessorsCsv)
router.put("/professorlist/:id", userAuth, updateProfessor)
router.delete("/professorlist/:id", userAuth, deleteProfessor)

router.get("/temelist", getTemeList)
router.get("/temelist/:id", getTema)
router.post("/temelist", addTema)
router.put("/temelist/:id", updateTema)
router.delete("/temelist/:id" , deleteTema)
router.post("profesorlist/importtitluritemecsv", importTitluriTemeCsv)

module.exports = router