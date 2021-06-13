const { Router } = require("express");
const { loginUser, registerUser } = require("../../controllers/users");

const route = Router();

route.post("/", registerUser);
route.post("/login", loginUser);

// route.post("/", async (req, res) => {
//   try {
//     const createdUser = await registerUser({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     res.send(createdUser);
//   } catch (error) {
//     res.status(400).send({ error: { body: [error.message] } });
//   }
// });

// route.post("/login", async (req, res) => {
//   try {
//     const verifiedUser = await verifyUser({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     res.send(verifiedUser);
//   } catch (error) {
//     res.status(403).send(error.message);
//   }
// });

module.exports = route;
