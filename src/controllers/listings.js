const { RES_STATUS, RES_ERROR_CODE } = require("../constants/response");
const { createErrResponse, createSuccessResponse } = require("../utils/response");
const cmAxios = require("../config/cmAxios");
const logger = require("../config/logger");

async function getListings(req, res, next) {
  await cmAxios
    .get("cryptocurrency/listings/latest", {
      params: {
        start: req.body.start || "1",
        limit: req.body.limit || "5000",
        convert: req.body.convert || "USD",
      },
    })
    .then((response) => {
      logger.info(`Get listings user id: ${req.user._id} `);
      return res.send(createSuccessResponse(RES_STATUS.SUCCESS, { listings: response.data.data }));
    })
    .catch((err) =>
      res.status(500).send(
        createErrResponse(RES_STATUS.FAILED, {
          code: RES_ERROR_CODE.SERVER_ERROR,
          message: err.message,
        })
      )
    );
}

module.exports = {
  getListings,
};
