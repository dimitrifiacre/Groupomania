const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE" });
      models.Post.hasMany(models.Comment, { foreignKey: "post_id" });
      models.Post.hasMany(models.Like, { foreignKey: "post_id" });
    }
  }
  Post.init(
    {
      post_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      post_content: { type: DataTypes.TEXT, allowNull: false },
      post_image_url: { type: DataTypes.STRING, allowNull: true },
      post_creation_date: { type: DataTypes.DATE, allowNull: false },
      post_modification_date: { type: DataTypes.DATE, allowNull: false },
    },
    { timestamps: true, createdAt: "post_creation_date", updatedAt: "post_modification_date", sequelize, modelName: "Post" }
  );
  return Post;
};