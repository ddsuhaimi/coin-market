const { verifyJwt } = require("../utils/jwt");
const { RES_STATUS, RES_ERROR_CODE } = require("../constants/response");
const { createErrResponse } = require("../utils/response");

async function authToken(req, res, next) {
  const auth = req.header("Authorization");

  if (!auth) {
    return res.status(403).send(
      createErrResponse(RES_STATUS.FAILED, {
        code: RES_ERROR_CODE.BAD_CREDENTIALS,
      })
    );
  }

  //   const token = req.header("Authorization").split(" ")[1];
  const token = req.header("Authorization");

  try {
    const user = await verifyJwt(token);
    req.user = user;
    return next();
  } catch (error) {
    res
      .status(403)
      .send(createErrResponse(RES_STATUS.FAILED, { code: RES_ERROR_CODE.BAD_CREDENTIALS }));
  }
}

module.exports = {
  authToken,
};
