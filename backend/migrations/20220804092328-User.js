"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      user_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, onDelete: "CASCADE" },
      user_firstname: { type: DataTypes.STRING, allowNull: false },
      user_lastname: { type: DataTypes.STRING, allowNull: false },
      user_email: { type: DataTypes.STRING, allowNull: false, unique: true },
      user_password: { type: DataTypes.STRING, allowNull: false },
      user_avatar_url: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      user_job: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      user_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
      user_creation_date: { type: DataTypes.DATE, allowNull: false },
      user_modification_date: { type: DataTypes.DATE, allowNull: false },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};