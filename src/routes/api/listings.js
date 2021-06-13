const { Router } = require("express");
const { authToken } = require("../../middlewares/auth");
const { getListings } = require("../../controllers/listings");

const route = Router();

route.get("/", authToken, getListings);

module.exports = route;
