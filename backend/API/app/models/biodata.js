const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'biodata',
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
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      height: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      fat_perc: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      activity_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'activity',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'biodata',
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
        {
          name: 'activity_idx',
          using: 'BTREE',
          fields: [{ name: 'activity_id' }],
        },
      ],
    },
  )
}
