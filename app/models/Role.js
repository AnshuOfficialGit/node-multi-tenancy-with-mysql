const { DataTypes } = require("sequelize");
let sequelizeMain;
module.exports = (sequelizeInstance) => {
  sequelizeMain = sequelizeInstance;
  return sequelizeMain.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "roles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  
};
