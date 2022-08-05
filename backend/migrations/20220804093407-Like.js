"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("likes", {
      like_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "user_id" } },
      post_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "posts", key: "post_id" } },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("likes");
  },
};