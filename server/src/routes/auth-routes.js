const { Router } = require('express');
const { getUsers, register, login, userData, protected, adminProtected, logout } = require('../controllers/auth');
const { getStudentList, getSearchStudent, getStudent, addStudent, importStudentsCsv, updateStudent, deleteStudent, getFullNameStudent } = require('../controllers/studenti');
const { getProfessorsList, getSearchProfessor, getProfessor, addProfessor, importProfessorsCsv, updateProfessor, deleteProfessor, getFullNameProfesor } = require('../controllers/profesori');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { registerValidation, loginValidation } = require('../validators/auth-validators');
const { getTemeList, getTema, addTema, updateTema, deleteTema, importTitluriTemeCsv, getSearchTema } = require('../controllers/teme');
const { uploadFile, uploadImage, getFiles, downloadFile, fileDelete } = require('../controllers/files')
const passport = require('passport');
const router = Router();

router.get('/get-users', getUsers)
router.get('/protected', passport.authenticate('userPassport', { session: false }), protected)
router.get('/restricted', passport.authenticate('adminPassport', { session: false }), adminProtected)
router.post('/register', passport.authenticate('adminPassport', { session: false }), registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

router.post('/upload', uploadImage, uploadFile)
router.get("/files/:id", getFiles )
router.post("/download", downloadFile)
router.delete("/filedelete", fileDelete)

router.get("/studentlist", passport.authenticate('userPassport', { session: false }), getStudentList )
router.get("/searchstudent", passport.authenticate('userPassport', { session: false }), getSearchStudent)
router.get("/studentlist/:id", passport.authenticate('userPassport', { session: false }), getStudent)
router.get("/studentlist/fullname/:id", passport.authenticate('userPassport', { session: false }), getFullNameStudent)
router.post("/studentlist", passport.authenticate('adminPassport', { session: false }), addStudent)
router.post("/studentlist/importcsv", passport.authenticate('adminPassport', { session: false }), importStudentsCsv)
router.put("/studentlist/:id", passport.authenticate('adminPassport', { session: false }), updateStudent)
router.delete("/studentlist/:id", passport.authenticate('adminPassport', { session: false }), deleteStudent)

router.get("/professorlist", passport.authenticate('userPassport', { session: false }), getProfessorsList )
router.get("/searchprofessor", passport.authenticate('userPassport', { session: false }), getSearchProfessor)
router.get("/professorlist/:id", passport.authenticate('userPassport', { session: false }), getProfessor)
router.get("/professorlist/fullname/:id", passport.authenticate('userPassport', { session: false }), getFullNameProfesor)
router.post("/professorlist", passport.authenticate('adminPassport', { session: false }), addProfessor)
router.post("/professorlist/importcsv", passport.authenticate('adminPassport', { session: false }), importProfessorsCsv)
router.put("/professorlist/:id", passport.authenticate('adminPassport', { session: false }), updateProfessor)
router.delete("/professorlist/:id", passport.authenticate('adminPassport', { session: false }), deleteProfessor)

router.get("/temelist", passport.authenticate('userPassport', { session: false }), getTemeList)
router.get("/temelist/:id", passport.authenticate('userPassport', { session: false }), getTema)
router.post("/temelist", passport.authenticate('userPassport', { session: false }), addTema)
router.put("/temelist/:id", passport.authenticate('userPassport', { session: false }), updateTema)
router.delete("/temelist/:id", passport.authenticate('adminPassport', { session: false }) , deleteTema)
router.post("temelist/importtitluritemecsv", passport.authenticate('adminPassport', { session: false }), importTitluriTemeCsv)
router.get("/searchtema", passport.authenticate('userPassport', { session: false }), getSearchTema)

module.exports = router