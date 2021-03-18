import { ErrorHandler } from '../helper/error';
import POIandCircuitsQuery from '../interfaces/POIandCircuitsQuery';
import { query } from '../logger/loggerConfig';
// importer les models nécessaire pour requêter la base de données

export default class pointsOfInterest {
  static queryValidationFunction = (queryParameters: any) => {
    for (let key in queryParameters) {
      if (queryParameters[key] === '') {
        throw new ErrorHandler(400, 'all datas are required');
      }
    }
    return true;
  };

  static getPoiFromGps = async (req: any, res: any, next: any) => {
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
      "Vous avez demandé la liste des points d'intêrets en vous servant de votre GPS";

    try {
      pointsOfInterest.queryValidationFunction(req.body);
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

  static getPoiFromAdress = async (req: any, res: any, next: any) => {
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
      "Vous avez demandé la liste des points d'intêrets en vous servant d'une adresse";

    try {
      pointsOfInterest.queryValidationFunction(req.body);
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

  static getPoiFromPostal = async (req: any, res: any, next: any) => {
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
      "Vous avez demandé la liste des points d'intêrets en vous servant d'un code postal";

    try {
      pointsOfInterest.queryValidationFunction(req.body);
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

  static getPoint = async (req: any, res: any, next: any) => {
    const pointNumber = req.params.pointID;
    const responseMessage = `Vous avez demandé les information du point d'intêret n°${pointNumber}`;

    try {
      pointsOfInterest.queryValidationFunction(req.body);
      // const ressource = await modeltemplate.model(req.body / params / query);
      // if (ressource) {
      //   return res.status(200).json(ressource);
      // }
      // throw new ErrorHandler(400, 'circuits not found');

      return res.status(200).json({ response: responseMessage });
    } catch (error) {
      next(error);
    }
  };
}
