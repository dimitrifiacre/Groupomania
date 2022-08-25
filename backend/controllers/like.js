const db = require("../models");

exports.Like = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const postId = req.params.id;
    const userExist = await db.User.findOne({ where: { user_id: userId } });
    const postExist = await db.Post.findOne({ where: { post_id: postId } });
    const likeExist = await db.Like.findOne({ where: { post_id: postId, user_id: userId } });

    if (postExist) {
      if (userExist) {
        if (!likeExist) {
          await db.Like.create({
            post_id: postId,
            user_id: userId,
          });
          return res.status(201).json({ message: "Un j'aime a été ajouté" });
        } else {
          await db.Like.destroy({
            where: {
              post_id: postId,
              user_id: userId,
            },
          });
          return res.status(200).json({ message: "Le j'aime a été retiré" });
        }
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