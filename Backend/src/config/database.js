import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'creative-school',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Arun@123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
// ✅ ADD THIS FUNCTION
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Database connected successfully');

    // Optional (only if needed)
    // await sequelize.sync();
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
