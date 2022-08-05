const db = require("../models");
const bcrypt = require("bcrypt");

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
exports.userLogin = async (req, res) => {};