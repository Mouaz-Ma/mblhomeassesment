const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


// register
module.exports.register = async (req, res) => {
      if (!req.body.userName || !req.body.password) {
        res.json({
          success: false,
          message: "email or password missing"
        })
      } else {
        const newUser = new User({
          userName: req.body.userName,
          password : req.body.password
        });
        await newUser.save().then(() => {
          const token = jwt.sign(newUser.toJSON(), process.env.SECRETJWT, {
            expiresIn: 604800 // 1 week
          })
          res.json({
            success: true,
            token: token,
            message: "Your account has been saved! please check you email inbox for verification link,"
          })
        }).catch((err) => {
          //When there are errors We handle them here
          console.log(err);
          res.json({
            success: false,
            message: "Couldn't create new account!"
          })
  
      });
    }
}

// login
module.exports.login = async (req, res) => {
    try {
        console.log(req.body);
      const foundUser = await User.findOne({
        userName: req.body.userName
      });
      console.log(foundUser)
      if (!foundUser || !req.body.password) {
        res.json({
          success: false,
          message: "User not found!"
        })
      } else {
        if (foundUser.comparePassword(req.body.password)) {
          let token = jwt.sign(foundUser.toJSON(), process.env.SECRETJWT, {
            expiresIn: 604800 // 1 week
          })
          res.json({
            success: true,
            message: "Authentication successful",
            token: token
          });
        } else {
          res.status(403).json({
            success: false,
            message: 'Authentication faild, Email or password wrong'
          })
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

//   user logout
module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    res.json({
      success: true,
      message: "Bye!"
    })
  }
  
  
  // user profile
  module.exports.user = async (req, res) => {
    try {
      let foundUser = await User.findOne({
        _id: req.decoded._id
      });
      if (foundUser) {
        res.json({
          success: true,
          user: foundUser
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }