import ChallengeModel from "../models/challenge";
import StationModel from "../models/station";
import RolesService from "../services/roles";

export default class StationController {

  static get = async (req: any, res: any) => {
    try {
      const station = await StationModel.get(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static getUsers = async (req: any, res: any) => {
    try {
      const station = await StationModel.getUsers(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static getPistes = async(req: any, res: any) => {
    try {
      const station = await StationModel.getPistes(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static getOnlineUser = async(req: any, res: any) => {
    try {
      const station = await StationModel.getOnlineUser(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  
  static addUserToStation = async (req: any, res: any) => {
    try {
      let users = await StationModel.getUsers(req.params.id);
      console.log(users)
      if (
        users.filter((u: any) => u.idUtilisateur == req.params.idUtilisateur)
          .length == 0
      ) {
        
        const station = await StationModel.addUserToStation(
          req.params.id,
          req.params.idUtilisateur
        );
        return res.status(200).json(station);
      }else{
        return res.status(200).json(null);
      }
    } catch (error) {
      return error;
    }
  };

  static getAll = async (req: any, res: any) => {
    try {
      if (RolesService.isSuperAdmin(req.currentUser)) {
        console.log("isSuperAdmin");
        const stations = await StationModel.getAll();
        return res.status(200).json(stations);
      } else {
        const stations = await StationModel.getStationsForOrganisation(
          req.currentUser.idUtilisateur
        );
        return res.status(200).json(stations);
      }
    } catch (error) {
      return error;
    }
  };

  static getLives = async (req: any, res: any) => {
    try {
      const lives = await StationModel.getLivesForStation(req.params.id);
      return res.status(200).json(lives);
    } catch (error) {
      return error;
    }
  };

  static getChallenges = async (req: any, res: any) => {
    try {
      const challenges = await ChallengeModel.getChallengesForStation(req.params.id);
      return res.status(200).json(challenges);
    } catch (error) {
      return error;
    }
  };

  
}
