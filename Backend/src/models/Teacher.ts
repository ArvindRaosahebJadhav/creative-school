import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Teacher = sequelize.define("Teacher", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export const Teacher = sequelize.define("Teacher", {
  name: DataTypes.STRING,
  qualification: DataTypes.STRING,
  experience: DataTypes.STRING,
  subject: DataTypes.STRING,
  image_url: DataTypes.STRING,
});
