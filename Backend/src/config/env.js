import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'creative-school',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  },
  jwt_secret: process.env.JWT_SECRET || 'your-secret-key',
  upload: {
    max_size: process.env.UPLOAD_MAX_SIZE || 10485760,
    dest: process.env.UPLOAD_DEST || 'uploads',
  },
};
