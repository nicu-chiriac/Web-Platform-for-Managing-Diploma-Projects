const { check } = require("express-validator");
const { compare } = require("bcryptjs");
const db = require('../db');

//parola
const password = check('password')
  .isLength({ min:6, max: 15 })
  .withMessage('Parola trebuie să aibă între 6 și 15 caractere')

//email
const email = check('email') 
  .isEmail()
  .withMessage('Adresa de email nu este validă. Încearcă din nou!')
  

//verifica daca mailul exista
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [value])
  if (rows.length) {
    throw new Error('Emailul există deja!')
  }
})

//Validare LOGIN
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value])
  if (!user.rows.length) {
    throw new Error('Emailul nu există!')
  }
  
  const validPassword = await compare(req.body.password, user.rows[0].password)

  if(!validPassword) {
    throw new Error('Parolă greșită!')
  }

  req.user = user.rows[0]
})

module.exports = {
  registerValidation: [email, password, emailExists],
  loginValidation: [loginFieldsCheck],
}
