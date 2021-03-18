import dbc22 from "../dbc22";

export default class EffortModel {
  static get = async (id: number) => {
    const rows = await dbc22.query(`SELECT * FROM effort WHERE idEffort = ?`, [id]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };
}
