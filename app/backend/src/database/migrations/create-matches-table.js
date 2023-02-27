module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      home_team_id: {
        type: Sequelize.NUMBER,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      home_team_goals: {
        type: Sequelize.NUMBER,
      },

      away_team_id: {
        type: Sequelize.NUMBER,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      away_team_goals: {
        type: Sequelize.NUMBER,
      },

      in_progress: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
}
