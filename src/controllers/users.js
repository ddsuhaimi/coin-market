const User = require("../models/User");
const bcrypt = require("bcryptjs");
const logger = require("../config/logger");
const { createJwt, verifyJwt } = require("../utils/jwt");
const { createErrResponse, createSuccessResponse } = require("../utils/response");
const { RES_STATUS, RES_ERROR_CODE } = require("../constants/response");

async function registerUser(req, res, next) {
  let isFailed = false;
  let errObj = {};

  // Validate request
  if (!req.body.username) {
    isFailed = true;
    errObj.field = "username";
  }
  if (!req.body.email) {
    isFailed = true;
    errObj.field = "email";
  }
  if (!req.body.password) {
    isFailed = true;
    errObj.field = "password";
  }

  if (isFailed) {
    res.status(422).send(
      createErrResponse(RES_STATUS.FAILED, {
        ...errObj,
        code: RES_ERROR_CODE.MISSING_FIELD,
      })
    );
  }

  // check existing user
  const hasExist = await User.findOne({ email: req.body.email });
  if (hasExist)
    return res
      .status(400)
      .send(createErrResponse(RES_STATUS.FAILED, { code: RES_ERROR_CODE.EMAIL_EXIST }));

  // Populate the item
  const user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.token = await createJwt(user);
  user.password = user.getHashedPassword(req.body.password);

  // Save to database
  try {
    const newUser = await user.save();
    if (newUser) {
      logger.info(`User registered, id: ${user.id}`);
      return res.send(createSuccessResponse(RES_STATUS.SUCCESS, { user: newUser.toAuthJSON() }));
    }
  } catch (error) {
    return res.status(500).send(
      createErrResponse(RES_STATUS.FAILED, {
        resource: "User",
        code: RES_ERROR_CODE.CANT_CREATE_RESOURCE,
        message: error.message,
      })
    );
  }
}

async function loginUser(req, res, next) {
  let isFailed = false;
  let errObj = {};

  // Validate request
  if (!req.body.email) {
    isFailed = true;
    errObj.field = "email";
  }
  if (!req.body.password) {
    isFailed = true;
    errObj.field = "password";
  }

  if (isFailed) {
    return res.status(422).send(
      createErrResponse(RES_STATUS.FAILED, {
        ...errObj,
        code: RES_ERROR_CODE.MISSING_FIELD,
      })
    );
  }

  // Get matched user on the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(403)
      .send(createErrResponse(RES_STATUS.FAILED, { code: RES_ERROR_CODE.BAD_CREDENTIALS }));
  }

  // Check for matched password
  try {
    const correctPassword = await user.validPassword(req.body.password);
    if (!correctPassword) {
      return res
        .status(422)
        .send(createErrResponse(RES_STATUS.FAILED, { code: RES_ERROR_CODE.BAD_CREDENTIALS }));
    }
  } catch (err) {
    return res
      .status(500)
      .send(createErrResponse(RES_STATUS.FAILED, { code: RES_ERROR_CODE.SERVER_ERROR }));
  }

  // Finally, return the user info
  logger.info(`User logged in, id: ${user.id}`);
  return res.send(createSuccessResponse(RES_STATUS.SUCCESS, { user: user.toAuthJSON(false) }));
}

module.exports = {
  registerUser,
  loginUser,
};
