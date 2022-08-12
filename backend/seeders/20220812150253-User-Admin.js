module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        user_firstname: "Utilisateur",
        user_lastname: "Admin",
        user_email: "admin@groupomania.com",
        user_password: "$2b$10$c4B2aS0JBe26/ZSSqJHIpeJRZIv3wr/iXtk6LAmKw9DdOaAjYomJS",
        user_admin: 1,
        user_creation_date: new Date(),
        user_modification_date: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};