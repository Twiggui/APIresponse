import db from "../db";

export default class EffortModel {
  static get = async (id: number) => {
    const rows = await db.query(`SELECT * FROM effort WHERE idEffort = ?`, [
      id,
    ]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };
}
