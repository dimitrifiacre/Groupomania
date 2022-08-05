const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userRegister = async (req, res) => {
  try {
    const emailExist = await db.User.findOne({ where: { user_email: req.body.email } });
    if (!emailExist) {
      const user = await db.User.create({
        user_firstname: req.body.firstname,
        user_lastname: req.body.lastname,
        user_email: req.body.email,
        user_password: bcrypt.hashSync(req.body.password, 10),
      });
      return res.status(201).send(user);
    } else {
      return res.status(401).json({ error: "L'adresse email est déjà utilisée" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
exports.userLogin = async (req, res) => {
  try {
    const userExist = await db.User.findOne({ where: { user_email: req.body.email } });
    if (userExist) {
      const passwordIsValid = await bcrypt.compareSync(req.body.password, userExist.user_password);
      if (passwordIsValid) {
        const token = jwt.sign({ userId: userExist.user_id }, process.env.SECRET_TOKEN, { expiresIn: "24h" });
        return res.status(200).send({ userId: userExist.user_id, accessToken: token });
      } else {
        return res.status(401).json({ error: "Le mot de passe est incorrect" });
      }
    } else {
      return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};