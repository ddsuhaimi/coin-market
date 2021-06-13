const jwt = require("jsonwebtoken");
const config = require("../config/config");

async function createJwt(user) {
  const token = await jwt.sign(user.toObject(), config.jwt.secret);
  return token;
}

async function verifyJwt(token) {
  const user = await jwt.verify(token, config.jwt.secret);
  return user;
}

module.exports = {
  createJwt,
  verifyJwt,
};
