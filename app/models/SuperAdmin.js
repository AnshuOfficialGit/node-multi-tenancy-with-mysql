const { DataTypes } = require("sequelize");
let sequelizeMain;
module.exports = (sequelizeInstance) => {
  sequelizeMain = sequelizeInstance;
  return sequelizeMain.define(
    "SuperAdmin",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      deleted_by: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      paranoid: true,
      tableName: "super_admins",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
};
