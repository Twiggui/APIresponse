import liveModel from "../models/live";
import gpsModel from "../models/gps";

export default class LiveController {
  static getDetailLive = async (req: any, res: any) => {
    try {
      const live = await liveModel.getDetailLive(req.params.idlive);
      return res.status(200).json(live);
    } catch (error) {
      return error;
    }
  };

  static getLives = async (req: any, res: any) => {
    try {
      //TO DO : getlives for a station

      const lives = await liveModel.getLivesForUser(
        req.tokenPayload.user.idUtilisateur
      );
      return res.status(200).json(lives);
    } catch (error) {
      return error;
    }
  };

  static getEfforts = async (req: any, res: any) => {
    try {
      const lives = await liveModel.getEfforts(req.params.idlive);
      return res.status(200).json(lives);
    } catch (error) {
      return error;
    }
  };

  static deleteLive = async (req: any, res: any) => {
    try {
      const result = await liveModel.deleteLive(req.params.idLive);
      await gpsModel.deleteLive(req.params.idLive);
      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  };

  //api for mobile => TO DO LATER
  static createLive = async (req: any, res: any) => {
    try {
      const result = await liveModel.createLive(
        req.currentUser.idUtilisateur,
        req.body
      );
      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  };
}
