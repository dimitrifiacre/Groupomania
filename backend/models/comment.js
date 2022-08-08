const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, { foreignKey: "user_id" });
      models.Comment.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Comment.init(
    {
      comment_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      post_id: { type: DataTypes.INTEGER, allowNull: false },
      comment_content: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: { args: true, msg: "Le contenu du commentaire ne peut pas être vide" } } },
      comment_creation_date: { type: DataTypes.DATE, allowNull: false },
      comment_modification_date: { type: DataTypes.DATE, allowNull: false },
    },
    { timestamps: true, createdAt: "comment_creation_date", updatedAt: "comment_modification_date", sequelize, modelName: "Comment" }
  );
  return Comment;
};