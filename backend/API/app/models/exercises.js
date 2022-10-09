const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'exercises',
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
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'exercise_categories',
          key: 'id',
        },
      },
      bodypart_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: 'bodyparts',
          key: 'id',
        },
      },
      video_url: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'exercises',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'categories_idx',
          using: 'BTREE',
          fields: [{ name: 'category_id' }],
        },
        {
          name: 'bodyparts_idx',
          using: 'BTREE',
          fields: [{ name: 'bodypart_id' }],
        },
      ],
    },
  )
}
