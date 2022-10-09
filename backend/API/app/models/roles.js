const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'roles',
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
