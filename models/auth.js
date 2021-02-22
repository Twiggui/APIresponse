const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY, JWT_EXPIRES_IN } = require("../env");

// const test = process.env("JWT_private_key");

const saltRounds = 10;

const db = require("../db");

const findByEmail = async (email) => {
  const lowerCaseEmail = email.toLowerCase();
  const rows = await db.query(`SELECT * FROM users WHERE email = ?`, [lowerCaseEmail]);
  if (rows.length) {
    return rows[0];
  }
  return null;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const verifyPassword = async (password, encrypted_password) => {
  const verifiedPassword = await bcrypt.compare(password, encrypted_password);
  return verifiedPassword;
};

const emailAlreadyExists = async (email) => {
  const lowerCaseEmail = email.toLowerCase();
  const rows = await db.query(`SELECT * FROM users WHERE email = ?`, [lowerCaseEmail]);
  if (rows.length) {
    return new Error("Email already exists");
  }
  return false;
};

module.exports.createUserInDatabase = async (userDatas) => {
  try {
    const datasValidation = await emailAlreadyExists(userDatas.email);
    if (!datasValidation) {
      const { lastname, firstname, email, password } = userDatas;
      const lowercaseEmail = email.toLowerCase();
      const hashedPassword = await hashPassword(password);
      const res = await db.query(
        "INSERT INTO users (lastname, firstname, email, encrypted_password) VALUES (?, ?, ?, ?)",
        [lastname, firstname, lowercaseEmail, hashedPassword]
      );
      if (res) {
        return { lastname, firstname, lowercaseEmail, id: res.insertId };
      }
    }
  } catch (error) {
    return error;
  }
};

module.exports.logUserFromDatabase = async (userDatas) => {
  const { email, password } = userDatas;
  const lowercaseEmail = email.toLowerCase();
  const user = await findByEmail(lowercaseEmail);
  if (user) {
    const verifiedPassword = await verifyPassword(password, user.encrypted_password);
    if (verifiedPassword) {
      const token = jwt.sign(
        {
          data: "foobar",
        },
        JWT_PRIVATE_KEY,
        { expiresIn: parseInt(JWT_EXPIRES_IN) }
      );
      return token;
    }
    throw new Error("Wrong password");
  }
  throw new Error("Email doesn't exist");
};
