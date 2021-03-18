import liveDto from "../dto/LiveDto";

import dbc22 from "../dbc22";
import Live from "../interfaces/live";
import { any } from "joi";
import FolocodeService from "../services/folocode";

export default class CategoryModel {
  // static create = async (category: categoryDto) => {
  //   console.log(category);

  //   try {
  //     const res = await dbc22.query(
  //       "INSERT INTO live (idUtilisateur, idSport, os, idVersion, codeLive) VALUES (?, ?, ?, ?, ?)",
  //       [category.idUtilisateur, live.idSport, live.os, live.idVersion, FolocodeService.generateNewFolocode(5)]
  //     );
  //     console.log(res);
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return null;
  // };

  static get = async (id: number) => {
    let result = await dbc22.knex("live").select().limit(10);
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

  static delete = async (idLive: number) => {
    const rows = await dbc22.query(`DELETE FROM live WHERE idLive = ?`, [idLive]);
    if (rows.length > 0) {
      return rows;
    }
    return null;
  };
}
