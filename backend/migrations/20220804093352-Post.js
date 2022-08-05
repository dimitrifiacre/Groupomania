"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("posts", {
      post_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "user_id" } },
      post_content: { type: DataTypes.TEXT, allowNull: false },
      post_image_url: { type: DataTypes.STRING, allowNull: true },
      post_creation_date: { type: DataTypes.DATE, allowNull: false },
      post_modification_date: { type: DataTypes.DATE, allowNull: false },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("posts");
  },
};