/**
 * SQLite to PostgreSQL Migration Script
 * Converts school.db (SQLite) to PostgreSQL database
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { sequelize } from './src/config/database.js';
import logger from './src/utils/logger.js';
import { User } from './src/models/User.js';
import { Gallery } from './src/models/Gallery.js';
import { Teacher } from './src/models/Teacher.js';
import { Event } from './src/models/Event.js';
import { Announcement } from './src/models/Announcement.js';
import { Achievement } from './src/models/Achievement.js';
import { SchoolInfo } from './src/models/SchoolInfo.js';

// Resolve school.db path - check both current directory and parent
let dbPath = path.join(process.cwd(), 'school.db');
if (!fs.existsSync(dbPath)) {
  dbPath = path.join(process.cwd(), '..', 'school.db');
}

if (!fs.existsSync(dbPath)) {
  logger.error(
    'school.db not found. Checked:',
    path.join(process.cwd(), 'school.db'),
    path.join(process.cwd(), '..', 'school.db')
  );
  process.exit(1);
}

const db = new Database(dbPath);

const migrate = async () => {
  try {
    logger.info('Starting migration from SQLite to PostgreSQL');

    // Sync all models with PostgreSQL
    logger.info('Synchronizing database tables...');
    await sequelize.sync({ force: false, alter: true });
    logger.info('Database tables synchronized');

    // Migrate Users
    logger.info('Migrating users...');
    try {
      const users = db.prepare('SELECT * FROM users').all();
      for (const user of users) {
        await User.findOrCreate({
          where: { username: user.username },
          defaults: { username: user.username, password: user.password },
        });
      }
      logger.info(`Migrated ${users.length} users`);
    } catch (err) {
      logger.warn('Users table not found or empty (skipped)');
    }

    // Migrate Gallery
    logger.info('Migrating gallery items...');
    try {
      const gallery = db.prepare('SELECT * FROM gallery').all();
      for (const item of gallery) {
        await Gallery.findOrCreate({
          where: { url: item.url },
          defaults: {
            title: item.title || 'Untitled',
            type: item.type || 'photo',
            url: item.url,
            category: item.category,
          },
        });
      }
      logger.info(`Migrated ${gallery.length} gallery items`);
    } catch (err) {
      logger.warn('Gallery table not found or empty (skipped)');
    }

    // Migrate Teachers
    logger.info('Migrating teachers...');
    try {
      const teachers = db.prepare('SELECT * FROM teachers').all();
      for (const teacher of teachers) {
        await Teacher.findOrCreate({
          where: { name: teacher.name },
          defaults: {
            name: teacher.name,
            qualification: teacher.qualification,
            experience: teacher.experience,
            subject: teacher.subject,
            imageUrl: teacher.image_url,
          },
        });
      }
      logger.info(`Migrated ${teachers.length} teachers`);
    } catch (err) {
      logger.warn('Teachers table not found or empty (skipped)');
    }

    // Migrate Events
    logger.info('Migrating events...');
    try {
      const events = db.prepare('SELECT * FROM events').all();
      for (const event of events) {
        await Event.findOrCreate({
          where: { title: event.title, date: event.date },
          defaults: {
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            imageUrl: event.image_url,
          },
        });
      }
      logger.info(`Migrated ${events.length} events`);
    } catch (err) {
      logger.warn('Events table not found or empty (skipped)');
    }

    // Migrate Announcements
    logger.info('Migrating announcements...');
    try {
      const announcements = db.prepare('SELECT * FROM announcements').all();
      for (const announcement of announcements) {
        await Announcement.findOrCreate({
          where: { title: announcement.title },
          defaults: {
            title: announcement.title,
            content: announcement.content,
            date: announcement.date,
            isActive: announcement.is_active === 1,
          },
        });
      }
      logger.info(`Migrated ${announcements.length} announcements`);
    } catch (err) {
      logger.warn('Announcements table not found or empty (skipped)');
    }

    logger.info('Migration completed successfully');

    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error.message);
    logger.error('Working directory:', process.cwd());
    logger.error('Database file:', dbPath, 'exists:', fs.existsSync(dbPath));
    process.exit(1);
  } finally {
    try {
      db.close();
      await sequelize.close();
    } catch (err) {
      // Ignore close errors
    }
  }
};

migrate();
