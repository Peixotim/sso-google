'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      google_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      avatar_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("admin", "user"),
        defaultValue: "user",
      },      
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";'
      );
  }
};
