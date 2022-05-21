const db = require('../db');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants')

exports.getUsers = async (req,res) => {
  try {
    const { rows } = await db.query('SELECT user_id, email FROM users')
  
    return res.status(200).json({
      succes: true,
      users: rows
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req,res) => {
  const { email, password } = req.body;
  try {
    const hashedpassword = await hash(password, 10)

    await db.query('INSERT INTO users(email, password) values ($1, $2)', [email, hashedpassword])

    return res.status(201).json({
      succes: true,
      message: 'Înregistrare realizată cu succes!'
    })
    
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  let user = req.user
  
  let payload = {
    id: user.user_id,
    email: user.email,
    role : user.roles
  }
  try {
    //Creare JWTs
    const accessToken = await jwt.sign(payload, SECRET, { expiresIn:'60m' })
    
    // const refreshToken = await jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn:'1d' })

    return res.status(200).cookie('token', accessToken , { httpOnly: true }).json({
      succes: true,
      message: "Login realizat cu succes!",
    });
      // res.json({ accessToken });

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req,res) => {
  try {
    
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Delogare reușită!',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}