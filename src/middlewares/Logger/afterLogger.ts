const logger = require("../../logger/loggerConfig");
const pjson = require("../../../package.json");

export default (req: any, res: any, next: any) => {
  try {
    let oldSend = res.send;

    res.send = function (data: any) {
      res.send = oldSend;

      // FIXME: A vérifier mais pour l'instant "responseTime" est obtenu au moment où la réponse est interceptée et non pas au moment où elle est envoyée (ce middleware s'execute avant l'envoi de la réponse). Vérifier pour des requêtes conséquentes si l'écart de temps n'est pas trop important (ex : un GET postman qui prenait 101 ms est affiché ici comme prenant seulement 3ms)
      const responseTime: any = new Date().getTime();
      const requestExecutionDuration = responseTime - req.requestTime;
      let message = `${req.method} ${req.originalUrl}`;

      logger.info({
        session: req.sessionId,
        IpUser: req.ip,
        APIName: pjson.name,
        APIVersion: pjson.version,
        requestInfo: "",
        responseInfo: "Response",
        executionTime: `${requestExecutionDuration} ms`,
        message: message,
        response: data,
      });
      return res.send(data);
    };

    next();
  } catch (error) {
    next(error);
  }
};
