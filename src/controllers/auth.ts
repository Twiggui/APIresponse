import authModel from "../models/auth";

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

  static signIn = async (req: any, res: any) => {
    try {
      const login = await authModel.logUserFromDatabase(req.body);
      if (login != null) {
        return res.status(200).json(login);
      }
      return res.status(500).json("un problème est survenu");
    } catch (error) {
      console.log("🚀 ~ ", error);
      return res.status(401).send(error.message);
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
            applications: [{
             name: "folomi",
             roles :["admin"],
             organizations : [clients]
            }],
          },
          JWT_PRIVATE_KEY,
          { expiresIn: parseInt(JWT_EXPIRES_IN) }
        );
        const data = {
          token: token,
        };
        return res.status(200).json(data);
      }
      return res.status(500).json("un problème est survenu");
    } catch (error) {
      console.log("🚀 ~ ", error);
      return res.status(401).send(error.message);
    }
  };
}
