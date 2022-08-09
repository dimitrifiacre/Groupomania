const db = require("../models");

exports.createComment = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const postId = req.params.id;
    const userExist = await db.User.findOne({ where: { user_id: userId } });
    const postExist = await db.Post.findOne({ where: { post_id: postId } });

    if (postExist) {
      if (userExist) {
        await db.Comment.create({
          comment_content: req.body.content,
          post_id: postId,
          user_id: userId,
        });
        return res.status(201).json({ message: "Le commentaire a été ajouté" });
      } else {
        return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
      }
    } else {
      return res.status(404).json({ error: "La publication n'a pas été trouvée" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const commentExist = await db.Comment.findOne({ where: { comment_id: req.params.id } });
    const userExist = await db.User.findOne({ where: { user_id: userId } });

    if (commentExist) {
      if (commentExist.user_id === userId || userExist.user_admin === true) {
        await db.Comment.update({ comment_content: req.body.content, comment_modification_date: Date.now() }, { where: { comment_id: req.params.id } });
        return res.status(200).json({ message: "Le commentaire a été modifié" });
      } else {
        return res.status(401).json({ error: "Vous n'avez pas le droit de modifier ce commentaire" });
      }
    } else {
      return res.status(404).json({ error: "Le commentaire n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const commentExist = await db.Comment.findOne({ where: { comment_id: req.params.id } });
    const userExist = await db.User.findOne({ where: { user_id: userId } });

    if (commentExist) {
      if (commentExist.user_id === userId || userExist.user_admin === true) {
        await db.Comment.destroy({ where: { comment_id: req.params.id } });
        return res.status(200).json({ message: "Le commentaire a été supprimé" });
      } else {
        return res.status(401).json({ error: "Vous n'avez pas le droit de supprimer ce commentaire" });
      }
    } else {
      return res.status(404).json({ error: "Le commentaire n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};