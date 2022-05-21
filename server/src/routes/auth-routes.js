const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { getStudentList, getSearchStudent, getStudent, addStudent, importStudentsCsv, updateStudent, deleteStudent } = require('../controllers/studenti');
const { getProfessorsList, getSearchProfessor, getProfessor, addProfessor, importProfessorsCsv, updateProfessor, deleteProfessor } = require('../controllers/profesori');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { registerValidation, loginValidation } = require('../validators/auth-validators');
const { getTemeList, getTema, addTema, updateTema, deleteTema, importTitluriTemeCsv } = require('../controllers/teme');
const passport = require('passport');
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', passport.authenticate('userPassport', { session: false }), protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

router.get("/studentlist", passport.authenticate('userPassport', { session: false }), getStudentList )
router.get("/searchstudent", passport.authenticate('userPassport', { session: false }), getSearchStudent)
router.get("/studentlist/:id", passport.authenticate('userPassport', { session: false }), getStudent)
router.post("/studentlist", passport.authenticate('adminPassport', { session: false }), addStudent)
router.post("/studentlist/importcsv", passport.authenticate('adminPassport', { session: false }), importStudentsCsv)
router.put("/studentlist/:id", passport.authenticate('adminPassport', { session: false }), updateStudent)
router.delete("/studentlist/:id", passport.authenticate('adminPassport', { session: false }), deleteStudent)

router.get("/professorlist", passport.authenticate('userPassport', { session: false }), getProfessorsList )
router.get("/searchprofessor", passport.authenticate('userPassport', { session: false }), getSearchProfessor)
router.get("/professorlist/:id", passport.authenticate('userPassport', { session: false }), getProfessor)
router.post("/professorlist", passport.authenticate('adminPassport', { session: false }), addProfessor)
router.post("/professorlist/importcsv", passport.authenticate('adminPassport', { session: false }), importProfessorsCsv)
router.put("/professorlist/:id", passport.authenticate('adminPassport', { session: false }), updateProfessor)
router.delete("/professorlist/:id", passport.authenticate('adminPassport', { session: false }), deleteProfessor)

router.get("/temelist", getTemeList)
router.get("/temelist/:id", getTema)
router.post("/temelist", addTema)
router.put("/temelist/:id", updateTema)
router.delete("/temelist/:id" , deleteTema)
router.post("profesorlist/importtitluritemecsv", importTitluriTemeCsv)

module.exports = router