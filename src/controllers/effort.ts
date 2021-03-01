import { any } from "joi";
import EffortModel from "../models/effort";
import StationModel from "../models/station";
import RolesService from "../services/roles";

export default class EffortController {
  static get = async (req: any, res: any) => {
    try {
      const station = await EffortModel.get(req.params.id);
      return res.status(200).json(station);
    } catch (error) {
      return error;
    }
  };
}
