import { ErrorHandler } from "../helper/error";
// importer les models nécessaire pour requêter la base de données
import modeltemplate from "../models/modeltemplate";

export default class ClassController {
  static controller1 = async (req: any, res: any, next: any) => {
    try {
      // ciblage et action sur la base de données
      //   CREATE - READ - UPDATE - DELETE
      const ressource = await modeltemplate.model(req.body / params / query);
      if (ressource) {
        return res.status(200).json(ressource);
        // Si concluant code et ressource à renvoyer
        // CREATE : Code 201 + ressource ajoutée filtrée pour envoi au client (via insertId) + option : lien URL vers cette ressource
        // READ : Code 200 + ressource(s) filtrée(s) pour envoi au client
        // UPDATE : Code 200 + identifiant de la ressource modifiée
        // DELETE : Code 204 + message signifiant le bon déroulement de la suppression
      }
      throw new ErrorHandler(code, "message");
      //   Déclarer une erreur à ce niveau permet de basculer vers le next(error) en fin de controller
      // Si echec identifiable code et ressource à renvoyer
      // CREATE : Code 400 bad request - message champs non/mal renseignés
      // READ : Code 400 bad request - message champs non/mal renseignés
      // UPDATE : Code 400 bad request - message champs non/mal renseignés
      // DELETE : Code 400 bad request - message champs non/mal renseignés
    } catch (error) {
      // next(error) renvoie vers le middleware handleError qui s'execute dans app.ts en tout dernier recours et dispose d'un argument err permettant de récupérer toutes les erreurs lors d'une requête et de les traiter (message à envoyer, logs à afficher)
      next(error);
    }
  };

  static controllerNoComment = async (req: any, res: any, next: any) => {
    try {
      const ressource = await modeltemplate.model(req.body / params / query);
      if (ressource) {
        return res.status(200).json(ressource);
      }
      throw new ErrorHandler(code, "message");
    } catch (error) {
      next(error);
    }
  };
}
