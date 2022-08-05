"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("comments", {
      comment_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "user_id" } },
      post_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "posts", key: "post_id" } },
      comment_content: { type: DataTypes.TEXT, allowNull: false },
      comment_creation_date: { type: DataTypes.DATE, allowNull: false },
      comment_modification_date: { type: DataTypes.DATE, allowNull: false },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("comments");
  },
};