const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'clients',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      gender: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      cellphone: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'clients',
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
