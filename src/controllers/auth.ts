import authModel from "../models/auth";

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
      if (login.length) {
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
        return res.status(200).json(login);
      }
      return res.status(500).json("un problème est survenu");
    } catch (error) {
      console.log("🚀 ~ ", error);
      return res.status(401).send(error.message);
    }
  };
}
