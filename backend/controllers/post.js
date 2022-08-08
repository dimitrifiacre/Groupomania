const db = require("../models");
const fs = require("fs");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ["post_id", "post_content", "post_image_url", "post_creation_date", "post_modification_date"],
      order: [["post_creation_date", "DESC"]],
      include: [
        {
          model: db.User,
          attributes: ["user_id", "user_firstname", "user_lastname", "user_avatar_url", "user_admin"],
        },
        {
          model: db.Like,
          attributes: ["user_id"],
        },
        {
          model: db.Comment,
          attributes: ["comment_id", "comment_content"],
          include: [
            {
              model: db.User,
              attributes: ["user_id", "user_firstname", "user_lastname", "user_avatar_url", "user_admin"],
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const imageUrl = req.file ? `${req.file.filename}` : null;
    const userId = req.auth.userId;
    const userExist = await db.User.findOne({ where: { user_id: userId } });
    if (userExist) {
      await db.Post.create({
        post_content: req.body.content,
        post_image_url: imageUrl,
        user_id: userId,
      });
      return res.status(201).json({ message: "La publication a été créee" });
    } else {
      return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const postExist = await db.Post.findOne({ where: { post_id: req.params.id } });
    const userExist = await db.User.findOne({ where: { user_id: userId } });

    if (postExist) {
      if (postExist.user_id === userId || userExist.user_admin === true) {
        const imageUrl = req.file ? `${req.file.filename}` : null;
        const postObject = req.file
          ? { ...fs.unlink(`images/${postExist.post_image_url}`, () => {}), post_content: req.body.content, post_image_url: imageUrl }
          : { ...fs.unlink(`images/${postExist.post_image_url}`, () => {}), post_content: req.body.content, post_image_url: imageUrl };
        await db.Post.update({ ...postObject }, { where: { post_id: req.params.id } });
        return res.status(200).json({ message: "La publication a été modifiée" });
      } else {
        return res.status(401).json({ error: "Vous n'avez pas le droit de modifier cette publication" });
      }
    } else {
      return res.status(404).json({ error: "La publication n'a pas été trouvée" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const postExist = await db.Post.findOne({ where: { post_id: req.params.id } });
    const userExist = await db.User.findOne({ where: { user_id: userId } });

    if (postExist) {
      if (postExist.user_id === userId || userExist.user_admin === true) {
        if (postExist.post_image_url !== null) {
          fs.unlink(`images/${postExist.post_image_url}`, () => {});
        }
        await db.Post.destroy({ where: { post_id: req.params.id } });
        return res.status(200).json({ message: "La publication a été supprimée" });
      } else {
        return res.status(401).json({ error: "Vous n'avez pas le droit de supprimer cette publication" });
      }
    } else {
      return res.status(404).json({ error: "La publication n'a pas été trouvée" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};