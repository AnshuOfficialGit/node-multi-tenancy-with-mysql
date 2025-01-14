const { DataTypes } = require("sequelize");
let sequelizeMain;
module.exports = (sequelizeInstance) => {
  sequelizeMain = sequelizeInstance;
  return sequelizeMain.define(
    "RolePermission",
    {
     
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
      },
      permission_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "permissions",
          key: "id",
        },
      },
    },
    {
      tableName: "role_permissions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
