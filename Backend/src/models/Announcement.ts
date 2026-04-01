import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Announcement = sequelize.define("Announcement", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export const Announcement = sequelize.define("Announcement", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  date: DataTypes.STRING,
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
