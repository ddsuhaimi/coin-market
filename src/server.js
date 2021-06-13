const app = require("./app");
const logger = require("./config/logger");
const config = require("./config/config");

const port = config.app.port;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
