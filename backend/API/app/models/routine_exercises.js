const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'routine_exercises',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      routine_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'routines',
          key: 'id',
        },
      },
      exercise_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      sets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rest: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'routine_exercises',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'routines_idx',
          using: 'BTREE',
          fields: [{ name: 'routine_id' }],
        },
        {
          name: 'exercises_idx',
          using: 'BTREE',
          fields: [{ name: 'exercise_id' }],
        },
      ],
    },
  )
}
