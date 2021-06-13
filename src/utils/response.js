const { RES_STATUS } = require("../constants/response");

function createErrResponse(status = RES_STATUS.FAILED, errors) {
  return { status: status, errors: errors };
}

function createSuccessResponse(status = RES_STATUS.SUCCESS, data) {
  return { status: status, data: data };
}

module.exports = {
  createErrResponse,
  createSuccessResponse,
};
