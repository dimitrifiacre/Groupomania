const db = require("../models");

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
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const imageUrl = req.file ? `${req.file.filename}` : null;
    const userId = req.auth.userId;
    const userExist = await db.User.findOne({ where: { user_id: userId } });
    if (userExist) {
      const post = await db.Post.create({
        post_content: req.body.content,
        post_image_url: imageUrl,
        user_id: userId,
      });
      return res.status(201).send(post);
    } else {
      return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {};

exports.deletePost = async (req, res) => {};