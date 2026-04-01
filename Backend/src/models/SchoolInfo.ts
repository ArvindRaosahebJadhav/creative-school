import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const SchoolInfo = sequelize.define("SchoolInfo", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
