const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt.js')
const { jwtSign } = require('../helpers/jwt.js');
const googleVerification = require('../helpers/googleOauthApi.js');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    
    User.create({
      email,
      password
    })
      .then(user => {
        const token = jwtSign({
          id: user.id,
          email: user.email
        });

        res.status(201).json({
          token
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if (!user || !comparePassword(password, user.password)) {
          throw {
            msg: 'invalid email/password',
            code: 400
          }
        } else {
          const token = jwtSign({
            id: user.id,
            email: user.email
          });

          res.status(200).json({
            token
          });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    let google_token = req.headers.google_token;
    let email = null;
    let newUser = false;

    googleVerification(google_token)
      .then(payload => {
        email = payload.email;
        console.log(email)
        return User
          .findOne({
            where: {
              email
            }
          })
      })
      .then(user => {
        if (user) {
          return user;
        } else {
          newUser = true;
          return User
            .create({
              email,
              password: process.env.DEFAULT_GOOGLE_PASSWORD
            });
        }
      })
      .then(user => {
        let code = newUser ? 201 : 200;

        const token = jwtSign({
          id: user.id,
          email: user.email
        });

        res.status(code).json({
          token
        });
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = UserController;