// const config = require("config");

const { createLogger, format, transports } = require("winston");
const winston = require("winston/lib/winston/config");
require("winston-syslog").Syslog;
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(
  ({ session, IpUser, APIName, APIVersion, level, requestInfo, responseInfo, message, timestamp, ...metadata }) => {
    let msg = `${session} ~ Adresse IP : ${IpUser} ~ API : ${APIName}-V${APIVersion} ~ ${timestamp} ~ ${requestInfo}${responseInfo} ~ [${level}] => ${message} `;
    if (metadata) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  }
);

const logger = createLogger({
  level: "silly",
  format: combine(splat(), timestamp(), myFormat),

  transports: [
    new transports.File({ filename: "log_combined.log", maxsize: 10485760 /* maxsize = 10 Mo */ }),
    new transports.Syslog({
      host: process.env.LOG_TCP_HOST,
      port: process.env.LOG_TCP_PORT,
      protocol: "tcp4",
      format: format.json(),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console());
}

module.exports = logger;
