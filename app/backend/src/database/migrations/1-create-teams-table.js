'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      teamName: {
        type: Sequelize.STRING,
        field: 'team_name',
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
}
