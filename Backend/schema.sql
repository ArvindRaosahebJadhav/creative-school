-- PostgreSQL Schema for School Management System
-- Created by Sequelize ORM

-- Users Table
CREATE TABLE IF NOT EXISTS "Users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS "Galleries" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "type" VARCHAR(255) CHECK (type IN ('photo', 'video')),
  "url" VARCHAR(255) NOT NULL,
  "category" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers Table
CREATE TABLE IF NOT EXISTS "Teachers" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "qualification" VARCHAR(255),
  "experience" VARCHAR(255),
  "subject" VARCHAR(255),
  "imageUrl" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS "Events" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "date" TIMESTAMP NOT NULL,
  "location" VARCHAR(255),
  "imageUrl" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS "Announcements" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS "Achievements" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "date" TIMESTAMP NOT NULL,
  "imageUrl" VARCHAR(255),
  "category" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SchoolInfo Table
CREATE TABLE IF NOT EXISTS "SchoolInfos" (
  "id" SERIAL PRIMARY KEY,
  "key" VARCHAR(255) UNIQUE NOT NULL,
  "value" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "idx_users_username" ON "Users"("username");
CREATE INDEX IF NOT EXISTS "idx_galleries_category" ON "Galleries"("category");
CREATE INDEX IF NOT EXISTS "idx_teachers_subject" ON "Teachers"("subject");
CREATE INDEX IF NOT EXISTS "idx_events_date" ON "Events"("date");
CREATE INDEX IF NOT EXISTS "idx_announcements_active" ON "Announcements"("isActive");
CREATE INDEX IF NOT EXISTS "idx_achievements_category" ON "Achievements"("category");


