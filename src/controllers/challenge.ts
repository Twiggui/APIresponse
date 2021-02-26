import ChallengeModel from "../models/challenge";
import StationModel from "../models/station";
import RolesService from "../services/roles";

export default class ChallengeController {
  static get = async (req: any, res: any) => {
    try {
      const station = await ChallengeModel.get(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static getForChallenge = async (req: any, res: any) => {
    try {
      const station = await StationModel.getUsers(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static addUserToStation = async (req: any, res: any) => {
    try {
      let users = await StationModel.getUsers(req.params.id);
      console.log(users);
      if (
        users.filter((u: any) => u.idUtilisateur == req.params.idUtilisateur)
          .length == 0
      ) {
        const station = await StationModel.addUserToStation(
          req.params.id,
          req.params.idUtilisateur
        );
        return res.status(200).json(station);
      } else {
        return res.status(200).json(null);
      }
    } catch (error) {
      return error;
    }
  };

  static getAll = async (req: any, res: any) => {
    try {
      if (RolesService.isSuperAdmin(req.tokenPayload.user)) {
        console.log("isSuperAdmin");
        const stations = await StationModel.getAll();
        return res.status(200).json(stations);
      } else {
        const stations = await StationModel.getStationsForUser(
          req.tokenPayload.user.idUtilisateur
        );
        return res.status(200).json(stations);
      }
    } catch (error) {
      return error;
    }
  };
}
