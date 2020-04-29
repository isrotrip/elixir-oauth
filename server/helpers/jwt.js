const jwt = require('jsonwebtoken');

function jwtSign(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
}

function jwtVerify(token) {
  const result = jwt.verify(token, process.env.JWT_SECRET);
  return result;
}

module.exports = {
  jwtSign,
  jwtVerify
}