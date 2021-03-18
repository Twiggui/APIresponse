import authModel from "../models/authentication";
import { addClientInRateLimitArray } from "../middlewares/Authentification/rateLimit";
import { ErrorHandler } from "../helper/error";

const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY, JWT_EXPIRES_IN } = require("../env");

export default class AuthController {
  static signUp = async (req: any, res: any) => {
    try {
      const user = await authModel.createUserInDatabase(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return error;
    }
  };

  static login = async (req: any, res: any) => {
    try {
      const login = await authModel.logUserFromDatabase(req.body);
      if (login) {
        const clients = await authModel.findClients(login.IDOperateur);
        const token = jwt.sign(
          {
            user: login,
            // FIXME: apikey rentrée en dur en attendant de pouvoir aller la chercher en base de données
            apikey: "clientDatas.apikey",
            applications: [
              {
                name: "folomi",
                roles: ["admin"],
                organizations: [clients],
              },
            ],
          },
          JWT_PRIVATE_KEY,
          { expiresIn: parseInt(JWT_EXPIRES_IN) }
        );
        const data = {
          token: token,
        };
        addClientInRateLimitArray(clients);
        return res.status(200).json(data);
      }
      return res.status(500).json("un problème est survenu");
    } catch (error) {
      return res.status(401).send(error.message);
    }
  };

  // FIXME: Controller de test à supprimer
  static getUsers = async (req: any, res: any) => {
    const allUsers = await authModel.getAll();
    return res.status(200).send(allUsers);
  };
  // FIXME: Controller de test à supprimer
  static getError = async (req: any, res: any) => {
    throw new ErrorHandler(510, "this is an error");
  };
}
