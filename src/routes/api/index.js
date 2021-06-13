const { Router } = require("express");
const route = Router();

route.use("/users", require("./users"));
route.use("/listings", require("./listings"));

module.exports = route;
