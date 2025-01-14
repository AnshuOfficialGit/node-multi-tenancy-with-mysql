const { DataTypes } = require("sequelize");
const { sequelizeMain } = require("../../config/database");
const Tenant = sequelizeMain.define(
  "Tenant",
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
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_limit:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    database_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    update_by: {
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
    tableName: "tenants",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
module.exports = Tenant;
