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

exports.updateComment = async (req, res) => {};

exports.deleteComment = async (req, res) => {};