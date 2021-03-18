import { ErrorHandler } from '../helper/error';
import POIandCircuitsQuery from '../interfaces/POIandCircuitsQuery';
import { query } from '../logger/loggerConfig';
// importer les models nécessaire pour requêter la base de données

export default class circuits {
  static queryValidationFunction = (queryParameters: any) => {
    for (let key in queryParameters) {
      if (queryParameters[key] === '') {
        throw new ErrorHandler(400, 'all datas are required');
      }
    }
    return true;
  };

  static getCircuitsFromGps = async (req: any, res: any, next: any) => {
    const {
      appProjectOwnerID,
      latitudeTarget,
      longitudeTarget,
      radius,
      lang,
      birth,
      latitudeSource,
      longitudeSource,
      speed,
      heading,
      altitude,
      activity,
      isMoving,
      type,
      cat,
      page,
      perPage,
      content,
      custom,
    } = req.body;
    const responseMessage =
      'Vous avez demandé la liste des circuits en vous servant de votre GPS';

    try {
      circuits.queryValidationFunction(req.body);
      // const ressource = await modeltemplate.model(req.body / params / query);
      // if (ressource) {
      //   return res.status(200).json(ressource);
      // }
      // throw new ErrorHandler(400, 'circuits not found');

      return res.status(200).json({
        response: responseMessage,
        request: req.body,
      });
    } catch (error) {
      next(error);
    }
  };

  static getCircuitsFromAdress = async (req: any, res: any, next: any) => {
    const {
      appProjectOwnerID,
      query: adress,
      radius,
      lang,
      birth,
      latitudeSource,
      longitudeSource,
      speed,
      heading,
      altitude,
      activity,
      isMoving,
      type,
      cat,
      page,
      perPage,
      content,
      custom,
    } = req.body;
    const responseMessage =
      "Vous avez demandé la liste des circuits en vous servant d'une adresse";

    try {
      circuits.queryValidationFunction(req.body);
      // const ressource = await modeltemplate.model(req.body / params / query);
      // if (ressource) {
      //   return res.status(200).json(ressource);
      // }
      // throw new ErrorHandler(400, 'circuits not found');

      return res
        .status(200)
        .json({ response: responseMessage, request: req.body });
    } catch (error) {
      next(error);
    }
  };

  static getCircuitsFromPostal = async (req: any, res: any, next: any) => {
    const {
      appProjectOwnerID,
      query: postal,
      radius,
      lang,
      birth,
      latitudeSource,
      longitudeSource,
      speed,
      heading,
      altitude,
      activity,
      isMoving,
      type,
      cat,
      page,
      perPage,
      content,
      custom,
    } = req.body;
    const responseMessage =
      "Vous avez demandé la liste des circuits en vous servant d'un code postal";

    try {
      circuits.queryValidationFunction(req.body);
      // const ressource = await modeltemplate.model(req.body / params / query);
      // if (ressource) {
      //   return res.status(200).json(ressource);
      // }
      // throw new ErrorHandler(400, 'circuits not found');

      return res
        .status(200)
        .json({ response: responseMessage, request: req.body });
    } catch (error) {
      next(error);
    }
  };
}
