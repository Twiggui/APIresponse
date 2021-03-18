const logger = require("../../logger/loggerConfig");
const pjson = require("../../../package.json");

let sessionNumber = 999;

export default (req: any, res: any, next: any) => {
  try {
    sessionNumber < 9999 ? sessionNumber++ : (sessionNumber = 999);

    let currentDate = new Date();
    let timestring =
      ("0" + currentDate.getHours()).slice(-2) +
      ("0" + currentDate.getMinutes()).slice(-2) +
      ("0" + currentDate.getSeconds()).slice(-2);
    let session = sessionNumber + "-" + timestring;
    req.requestTime = currentDate.getTime();
    req.sessionId = session;

    let message = `${req.method} ${req.originalUrl}`;

    logger.info({
      session: session,
      IpUser: req.ip,
      APIName: pjson.name,
      APIVersion: pjson.version,
      requestInfo: "Request ",
      responseInfo: "",
      message: message,
      req_body: req.body,
      req_params: req.params,
      req_query: req.query,
    });

    next();
  } catch (error) {
    next(error);
  }
};
