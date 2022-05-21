const express = require("express");
const app = express();
const cors = require("cors");
const { PORT, CLIENT_URL } = require("./src/constants");
const cookieParser = require('cookie-parser');
const passport = require('passport')

//import passport middlewares
require('./src/middlewares/passport-middleware');

//initializare middlewares
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

//import routes
const authRoutes = require('./src/routes/auth-routes')

//initializare rute 
app.use('/api', authRoutes)

const port = PORT || 3002;

//app start
const appStart = () => {
  try {
    app.listen(port, () => {
      console.log(`The server is running at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(`Error:${error.message}`)
  }
}

appStart()

