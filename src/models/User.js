const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { createJwt } = require("../utils/jwt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toAuthJSON = function (showToken = true) {
  const userDto = { username: this.username, email: this.email };
  if (showToken) return { ...userDto, token: this.token };

  return { ...userDto };
};

// UserSchema.methods.setToken = async function (email) {
//   this.token = await createJwt(email)
// }

UserSchema.methods.getHashedPassword = function (password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", UserSchema);
