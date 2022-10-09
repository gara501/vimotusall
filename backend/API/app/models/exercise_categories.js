const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'exercise_categories',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'exercise_categories',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
