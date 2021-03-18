import liveDto from "../dto/LiveDto";

import dbc22 from "../dbc22";
import Live from "../interfaces/live";
import { any } from "joi";
import FolocodeService from "../services/folocode";

export default class LiveModel {
  static createLive = async (idUtilisateur: number, live: liveDto) => {
    console.log(live);

    try {
      const res = await dbc22.query(
        "INSERT INTO live (idUtilisateur, idSport, os, idVersion, codeLive) VALUES (?, ?, ?, ?, ?)",
        [idUtilisateur, live.idSport, live.os, live.idVersion, FolocodeService.generateNewFolocode(5)]
      );
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  static getDetailLive = (id: number) => {
    let result = dbc22.knex("live").select().limit(10);
    console.log(result);

    return dbc22
      .knex("live")
      .where("idLive", id)
      .then((r: any) => {
        if (r.length > 0) {
          return r[0];
        } else {
          return null;
        }
      });
  };

  static deleteLive = async (idLive: number) => {
    const rows = await dbc22.query(`DELETE FROM live WHERE idLive = ?`, [idLive]);
    if (rows.length > 0) {
      return rows;
    }
    return null;
  };

  static getEfforts = async (idLive: any) => {
    const rows = await dbc22.query(`SELECT * FROM efforts WHERE idLive = ?`, [idLive]);
    if (rows.length > 0) {
      return rows;
    }
    return null;
  };

  static getLivesForUser = async (idUtilisateur: number) => {
    console.log("iduser : ", idUtilisateur);
    const rows = await dbc22.query(`SELECT * FROM live WHERE idUtilisateur = ?`, [idUtilisateur]);
    if (rows.length > 0) {
      return rows;
    }
    return null;
  };
}
