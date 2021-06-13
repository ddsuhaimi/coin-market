const { createLogger, transports, format } = require("winston");
const config = require("./config");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.printf((info) => `${info.level.toUpperCase()}: ${info.timestamp} ${info.message}`)
      ),
    }),
    new transports.File({
      filename: ".logs/server.log",
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.align(),
        format.printf((info) => `${info.level.toUpperCase()}: ${info.timestamp} ${info.message}`)
      ),
    }),
    new transports.MongoDB({
      level: "info",
      db: config.db.uri,
      options: {
        useUnifiedTopology: true,
      },
      collection: "logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
