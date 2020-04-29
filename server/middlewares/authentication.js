const { User } = require('../models');
const { jwtVerify } = require('../helpers/jwt');

function authentication(req, res, next) {
  try {
    if (!req.headers.access_token) {
      throw {
        msg: 'please login first',
        code: 401
      }
    } else {
      const userLogin = jwtVerify(req.headers.access_token);

      User
        .findOne({
          where: {
            id: userLogin.id,
            email: userLogin.email
          }
        })
        .then(user => {
          if (!user) {
            throw {
              msg: 'invalid token error, please login',
              code: 401
            }
          } else {
            req.userLogin = userLogin;
            next();
          }
        })
    }
  }
  catch (err) {
    next(err)
  }
}

module.exports = authentication;