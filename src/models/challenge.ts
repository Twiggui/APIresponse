import dbc22 from "../dbc22";
export default class ChallengeModel {
  static getChallengesForStation = async (idStation: number) => {
    const rows = await dbc22.query(`SELECT * FROM challenge where idStation = ?`, [idStation]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };
  static get = async (id: number) => {
    const rows = await dbc22.query(`SELECT * FROM challenge where idChallenge = ?)`, [id]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static getEfforts = async (id: number) => {
    const rows = await dbc22.query(`SELECT * FROM efforts WHERE idChallenge = ?`, [id]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static getAll = async () => {
    const rows = await dbc22.query(`SELECT * FROM station`);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  //TO DO : create challenge
}
