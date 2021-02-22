const authModel = require("../models/auth");

module.exports.signUp = async (req, res) => {
  try {
    const user = await authModel.createUserInDatabase(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return error;
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const login = await authModel.logUserFromDatabase(req.body);
    if (login.length) {
      return res.status(200).json(login);
    }
    return res.status(500).json("un problème est survenu");
  } catch (error) {
    console.log("🚀 ~ ", error);
    return res.status(401).send(error.message);
  }
};
