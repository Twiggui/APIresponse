import md5 from "md5";
import dbc22 from "../dbc22";
import User from "../model/user";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const db = require("../db");

export default class AuthModel {

  findByEmail = async (email: string) => {
    const lowerCaseEmail = email.toLowerCase();
    const rows = await db.query(`SELECT * FROM users WHERE email = ?`, [
      lowerCaseEmail,
    ]);
    if (rows.length) {
      return rows[0];
    }
    return null;
  };

  static findByEmailAndPassword = async (email: string, password: string) => {
    const lowerCaseEmail = email.toLowerCase();
    const rows = await dbc22.query(
      `SELECT * FROM operateur WHERE Email = ? AND Password= ?`,
      [lowerCaseEmail, password]
    );
    if (rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  };

  static hashPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  verifyPassword = async (password: string, encrypted_password: string) => {
    const verifiedPassword = await bcrypt.compare(password, encrypted_password);
    return verifiedPassword;
  };

  static emailAlreadyExists = async (email: string) => {
    const lowerCaseEmail = email.toLowerCase();
    const rows = await db.query(
      `SELECT * FROM utilisateur WHERE emailUtilisateur = ?`,
      [lowerCaseEmail]
    );
    if (rows.length) {
      return new Error("Email already exists");
    }
    return false;
  };

  static createUserInDatabase = async (userDatas: any) => {
    try {
      const datasValidation = await AuthModel.emailAlreadyExists(
        userDatas.email
      );
      if (datasValidation) {
        const { lastname, firstname, email, password } = userDatas;
        const lowercaseEmail = email.toLowerCase();
        const hashedPassword = await AuthModel.hashPassword(password);
        const res = await db.query(
          "INSERT INTO u (lastname, firstname, email, encrypted_password) VALUES (?, ?, ?, ?)",
          [lastname, firstname, lowercaseEmail, hashedPassword]
        );
        if (res) {
          return { lastname, firstname, lowercaseEmail, id: res.insertId };
        }
      } else {
        return "";
      }
    } catch (error) {
      return error;
    }
    return "";
  };

  static logUserFromDatabase = async (userDatas: any) => {
    const { email, password } = userDatas;
    const lowercaseEmail = email.toLowerCase();
    const user = await AuthModel.findByEmailAndPassword(
      lowercaseEmail,
      password
    );
    if (user) {
      return user;
    }
    throw new Error("user or password incorrect");
  };

  static findClients = async (IDOperateur: any)  => {
    const rows = await dbc22.query(
      `SELECT * FROM client WHERE IDClient IN (SELECT IDClient from operateur_client WHERE IDOperateur = ?) `,
      [IDOperateur]
    );
    if (rows.length > 0) {
      return rows;
    }
    return null;
  }

}
