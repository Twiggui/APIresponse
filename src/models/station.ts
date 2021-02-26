import liveDto from "../dto/LiveDto";

import db from "../db";
import Live from "../model/live";
import { any } from "joi";
import FolocodeService from "../services/folocode";
import moment from "moment";

export default class StationModel {
  static getStationsForUser = async (idUtilisateur: number) => {
    const rows = await db.query(
      `SELECT * FROM station WHERE idStation IN (SELECT idStation FROM droit 
      WHERE idUtilisateur = ? AND idStation IS NOT NULL)`,
      [idUtilisateur]
    );
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static get = async (id: number) => {
    const rows = await db.query(`SELECT * FROM station WHERE idStation = ?`, [
      id,
    ]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static getUsers = async (id: number) => {
    const rows = await db.query(
      `SELECT * FROM utilisateur WHERE idUtilisateur IN (SELECT idUtilisateur FROM droit 
      WHERE idStation = ? )`,
      [id]
    );
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static addUserToStation = async (
    idStation: number,
    idUtilisateur: number
  ) => {
    try {
      const res = await db.query(
        "INSERT INTO droit (idUtilisateur, idStation) VALUES (?, ?)",
        [idUtilisateur, idStation]
      );
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  static getAll = async () => {
    const rows = await db.query(`SELECT * FROM station`);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };
  static getLivesForStation = async (id: number) => {
    const rows = await db.query(`SELECT * FROM live WHERE idStationLive = ?`, [
      id,
    ]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static getPistes = async (id: number) => {
    const rows = await db.query(`SELECT * FROM piste WHERE idStation = ?`, [
      id,
    ]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static getOnlineUser = async (id: number) => {
    try {
      let date = moment().format("YYYY-MM-DD");

      console.log(date);

      const rows = await db.query(
        `SELECT
      U.idUtilisateur,
      U.nomUtilisateur,
      U.prenomUtilisateur,
      U.emailUtilisateur,
      U.folocodeUtilisateur
   FROM
      utilisateur U
   INNER JOIN live L ON U.idUtilisateur = L.idUtilisateur
   WHERE L.idStationLive = ? 
   AND  L.dateDernierePositionLive > ?
   AND L.etatLive != 3 AND L.isDeleted = 0`,
        [id, date]
      );
      if (rows.length > 0) {
        return rows;
      } else {
        console.log("la");
      }
      return [];
    } catch (e) {throw e}
  };
}
