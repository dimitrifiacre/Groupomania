const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.User, { foreignKey: "user_id" });
      models.Like.belongsTo(models.Post, { foreignKey: "post_id" });
    }
  }
  Like.init(
    {
      like_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      post_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false, sequelize, modelName: "Like" }
  );
  return Like;
};