import { any } from "joi";
import ChallengeModel from "../models/challenge";
import OrganisationModel from "../models/organisation";
import StationModel from "../models/station";
import RolesService from "../services/roles";

export default class OrganisationController {

  static getStations = async (req: any, res: any) => {
    try {
      const station = await OrganisationModel.getStations(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static get = async (req: any, res: any) => {
    try {
      const station = await OrganisationModel.get(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };

  static getAdminUsers = async (req: any, res: any) => {
    try {
      const operateurs = await OrganisationModel.getOperateurs(req.params.id);
      return res.status(200).json(operateurs);
    } catch (error) {
      return error;
    }
  };

  static getUsers = async (req: any, res: any) => {
    try {
      const users = await OrganisationModel.getUsers(req.params.id);
      return res.status(200).json(users);
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
