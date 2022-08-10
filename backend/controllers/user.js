const db = require("../models");

exports.getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await db.User.findOne({ where: { user_id: userId } });
    if (userExist) {
      const user = await db.User.findOne({ where: { user_id: userId }, attributes: ["user_id", "user_firstname", "user_lastname", "user_avatar_url", "user_job", "user_admin"] });
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {};

exports.deleteUser = async (req, res) => {};