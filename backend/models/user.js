const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post, { foreignKey: "user_id" });
      models.User.hasMany(models.Comment, { foreignKey: "user_id" });
      models.User.hasMany(models.Like, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_firstname: { type: DataTypes.STRING, allowNull: false, validate: { is: { args: ["^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$", "i"], msg: "Le prénom n'est pas valide" } } },
      user_lastname: { type: DataTypes.STRING, allowNull: false, validate: { is: { args: ["^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$", "i"], msg: "Le nom de famille n'est pas valide" } } },
      user_email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: { args: true, msg: "L'adresse email n'est pas valide" } } },
      user_password: { type: DataTypes.STRING, allowNull: false },
      user_avatar_url: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      user_job: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      user_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
      user_creation_date: { type: DataTypes.DATE, allowNull: false },
      user_modification_date: { type: DataTypes.DATE, allowNull: false },
    },
    { timestamps: true, createdAt: "user_creation_date", updatedAt: "user_modification_date", sequelize, modelName: "User" }
  );
  return User;
};