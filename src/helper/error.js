const logger = require("../../src/logger/loggerConfig");
const pjson = require("../../package.json");

// Creation d'un type d'erreur qui peut être appellée avec un code status et un message
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Creation d'un middleware qui est appelé dans app.ts le plus tard possible. Il dispose d'un argument err, permettant de renvoyer tous les next(err) des autres middlewares vers celui-ci. Lors du throw new ErrorHandler(code, message), si le status du code est >= 500, un log de type erreur est envoyé au serveur.
const handleError = (err, req, res) => {
  const { statusCode, message } = err;

  if (statusCode >= 500) {
    logger.error({
      session: req.sessionId,
      IpUser: req.ip,
      APIName: pjson.name,
      APIVersion: pjson.version,
      requestInfo: "",
      responseInfo: "Error   ",
      message: err,
    });
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
