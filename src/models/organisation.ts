
import db from "../db";
import moment from "moment";
import dbc22 from "../dbc22";

export default class OrganisationModel {

  static get = async (id: number) => {
    const rows = await db.query(`SELECT * FROM organisation WHERE IDCLient = ?`, [
      id,
    ]);
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };


 static getStations = async (id: number) => {
   try{

   
    const rows = await db.query(`SELECT S.* FROM station S WHERE idStation IN 
    (SELECT idStation from organisationstation WHERE IDCLient = ?)`, [
      id,
    ]);
    if (rows.length > 0) {
      return rows;
    }}
    catch(e)
    {
      console.log(e);
    }
    return [];
  };


static getOperateurs = async (idClient: number) => {
  try{
    const rows = await dbc22.query(
      `SELECT * FROM operateur
       WHERE idOperateur 
      IN (  SELECT IDOperateur 
            FROM operateur_client 
            WHERE IDClient = ? )`,
      [idClient]
    );
    if (rows.length > 0) {
      return rows;
    }
  }catch(e)
  {
    console.log(e)
  }

  return [];
};

  static getUsers = async (id: string) => {
    const rows = await db.query(
      `SELECT * FROM utilisateur WHERE organisation IN (SELECT name from organisation WHERE id = ? ) `,
      [id]
    );
    if (rows.length > 0) {
      return rows;
    }
    return [];
  };

  static addUser = async (
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
