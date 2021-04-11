  const LocalStrategy = require('passport-local').Strategy
  const passport = require('passport')
  const User = require("./models/User");

  if (process.env.NODE_ENV) {
      require("dotenv").config({
          path: `${__dirname}/.env.${process.env.NODE_ENV}`,
      });
  } else {
      require("dotenv").config();
  }


  passport.serializeUser(User.serializeUser()); //session encoding
  passport.deserializeUser(User.deserializeUser()); //session decoding
  passport.use(new LocalStrategy(User.authenticate()));