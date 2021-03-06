import dbc22 from "../dbc22";

export default class GpsModel {
  static addPositions = async (data: any[]) => {
    // const rows = await dbc22.query(`SELECT * FROM live WHERE idLive = ?`, [id]);
    // if (rows.length) {
    //   return rows[0];
    // }
    // return null;
  };

  static deleteLive = async (idLive: number) => {
    const rows = await dbc22.query(`DELETE FROM live WHERE idLive = ?`, [idLive]);
    if (rows.length > 0) {
      return rows;
    }
    return null;
  };

  static getPositions = async (idLive: number) => {
    const rows = await dbc22.query(`SELECT * FROM gps WHERE idLive = ?`, [idLive]);
    if (rows.length > 0) {
      return rows;
    }
    return null;
  };
}
