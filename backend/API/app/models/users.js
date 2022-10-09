const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      confirmed: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_role_idx',
          using: 'BTREE',
          fields: [{ name: 'role' }],
        },
      ],
    },
  )
}
