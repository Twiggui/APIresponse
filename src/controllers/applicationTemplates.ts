import { ErrorHandler } from '../helper/error';
import { query } from '../logger/loggerConfig';
// importer les models nécessaire pour requêter la base de données

export default class applicationTemplates {
  static getApplicationTemplate = async (req: any, res: any, next: any) => {
    const responseMessage = `Vous avez demandé le template n°${req.params.templateId}`;

    try {
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
