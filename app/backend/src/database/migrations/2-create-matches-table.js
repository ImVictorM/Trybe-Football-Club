'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      homeTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'home_team_id',
      },

      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },

      awayTeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'away_team_id',
      },

      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },

      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
}
