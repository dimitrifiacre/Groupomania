const db = require("../models");
const fs = require("fs");

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

exports.updateUser = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userExist = await db.User.findOne({ where: { user_id: req.params.id } });

    if (userExist) {
      if (userExist.user_id === userId) {
        const avatarUrl = req.file ? `${req.file.filename}` : null;
        const userObject = req.file
          ? { ...fs.unlink(`images/${userExist.user_avatar_url}`, () => {}), user_firstname: req.body.firstname, user_lastname: req.body.lastname, user_job: req.body.job, user_avatar_url: avatarUrl, user_modification_date: Date.now() }
          : { user_firstname: req.body.firstname, user_lastname: req.body.lastname, user_job: req.body.job, user_modification_date: Date.now() };
        await db.User.update({ ...userObject }, { where: { user_id: req.params.id } });
        return res.status(200).json({ message: "Le profil a été modifié" });
      } else {
        return res.status(401).json({ error: "Vous n'avez pas le droit de modifier ce profil" });
      }
    } else {
      return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userExist = await db.User.findOne({ where: { user_id: req.params.id } });

    if (userExist) {
      if (userExist.user_id === userId) {
        if (userExist.user_avatar_url !== null) {
          fs.unlink(`images/${userExist.user_avatar_url}`, () => {});
        }

        await db.User.destroy({ where: { user_id: req.params.id } });
        return res.clearCookie("sessionToken").status(200).json({ message: "Vous venez de supprimer votre compte" });
      } else {
        return res.status(401).json({ error: "Vous n'avez pas le droit de supprimer cet utilisateur" });
      }
    } else {
      return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};