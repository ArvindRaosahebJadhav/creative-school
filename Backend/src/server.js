import app from './app.js';
import { sequelize } from './config/database.js';
import logger from './utils/logger.js';
import './models/User.js';
import './models/Gallery.js';
import './models/Teacher.js';
import './models/Event.js';
import './models/Announcement.js';
import './models/Achievement.js';
import './models/SchoolInfo.js';
import { connectDB } from './config/database.js';

await connectDB();

const PORT = process.env.PORT || 5000;

// Sync database and start server
// const startServer = async () => {
//   try {
//     // Use alter:true in development to apply model changes to the DB schema.
//     // For production, replace this with proper migrations.
//     await sequelize.sync({ alter: true });
//     logger.info("Database synchronized");

//     app.listen(PORT, () => {
//       logger.info(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     logger.error("Failed to start server:", error);
//     process.exit(1);
//   }
// };

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected');

    const isDev = process.env.NODE_ENV !== 'production';

    await sequelize.sync({ alter: isDev });
    logger.info('Database synchronized');

    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
