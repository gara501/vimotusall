const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'routines',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'clients',
          key: 'id',
        },
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'routines',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'clients_idx',
          using: 'BTREE',
          fields: [{ name: 'client_id' }],
        },
      ],
    },
  )
}
