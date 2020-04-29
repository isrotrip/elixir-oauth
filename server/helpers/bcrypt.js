const bcrypt = require('bcryptjs');

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_ROUNDS));
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

function comparePassword(password, hash) {
  const result = bcrypt.compareSync(password, hash);

  return result;
}

module.exports = {
  hashPassword,
  comparePassword
}