# School Management System - Backend API

Professional Express.js backend with Sequelize ORM and PostgreSQL.

## 📁 Project Structure

```
Backend/
├── src/
│   ├── server.js                 # Entry point
│   ├── app.js                    # Express app configuration
│   ├── config/
│   │   ├── db.js                 # Database connection
│   │   └── env.js                # Environment config
│   ├── models/                   # Sequelize models
│   │   ├── User.ts
│   │   ├── Gallery.ts
│   │   ├── Teacher.ts
│   │   ├── Event.ts
│   │   ├── Announcement.ts
│   │   ├── Achievement.ts
│   │   └── SchoolInfo.ts
│   ├── controllers/              # Business logic
│   │   ├── auth.controller.js
│   │   ├── gallery.controller.js
│   │   ├── teacher.controller.js
│   │   ├── event.controller.js
│   │   ├── announcement.controller.js
│   │   ├── achievement.controller.js
│   │   └── school-info.controller.js
│   ├── routes/                   # API routes
│   │   ├── auth.routes.js
│   │   ├── gallery.routes.js
│   │   ├── teacher.routes.js
│   │   ├── event.routes.js
│   │   ├── announcement.routes.js
│   │   ├── achievement.routes.js
│   │   └── school-info.routes.js
│   └── middleware/               # Custom middleware
│       ├── auth.middleware.js    # JWT authentication
│       └── error.middleware.js   # Error handling
├── package.json
├── .env.example                  # Environment variables template
└── README.md
```

## 🚀 Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update credentials:
     ```env
     DB_NAME=creative-school
     DB_USER=postgres
     DB_PASSWORD=your_password
     JWT_SECRET=your-secret-key
     ```

3. **Migrate from SQLite (school.db) to PostgreSQL**

   If you have an existing `school.db` file:

   ```bash
   npm run migrate
   ```

   See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration instructions.

4. **Start Server**

   ```bash
   # Production
   npm start

   # Development (with auto-reload)
   npm run dev
   ```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/seed-admin` - Create admin account

### Gallery (Public)

- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get specific gallery item
- `POST /api/gallery` - Add gallery item (Auth required)
- `PUT /api/gallery/:id` - Update gallery item (Auth required)
- `DELETE /api/gallery/:id` - Delete gallery item (Auth required)

### Teachers (Public)

- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get specific teacher
- `POST /api/teachers` - Add teacher (Auth required)
- `PUT /api/teachers/:id` - Update teacher (Auth required)
- `DELETE /api/teachers/:id` - Delete teacher (Auth required)

### Events (Public)

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `POST /api/events` - Add event (Auth required)
- `PUT /api/events/:id` - Update event (Auth required)
- `DELETE /api/events/:id` - Delete event (Auth required)

### Announcements (Public)

- `GET /api/announcements` - Get active announcements
- `GET /api/announcements/:id` - Get specific announcement
- `POST /api/announcements` - Create announcement (Auth required)
- `PUT /api/announcements/:id` - Update announcement (Auth required)
- `DELETE /api/announcements/:id` - Delete announcement (Auth required)

### Achievements (Public)

- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get specific achievement
- `POST /api/achievements` - Add achievement (Auth required)
- `PUT /api/achievements/:id` - Update achievement (Auth required)
- `DELETE /api/achievements/:id` - Delete achievement (Auth required)

### School Info (Public)

- `GET /api/school-info` - Get all school info
- `GET /api/school-info/:key` - Get specific info by key
- `POST /api/school-info` - Set info (Auth required)
- `DELETE /api/school-info/:key` - Delete info (Auth required)

## 🔐 Authentication

Include JWT token in request header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Example Requests

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Gallery

```bash
curl http://localhost:5000/api/gallery
```

### Create Event (with auth)

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Sports Day","date":"2024-04-15","location":"Ground"}'
```

## 🛠️ Development Notes

- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (7-day expiry)
- **File Uploads**: Multer (stored in `/uploads`)
- **Error Handling**: Centralized error middleware
- **CORS**: Enabled for all origins

## 📦 Key Dependencies

- `express` - Web framework
- `sequelize` - ORM
- `pg` - PostgreSQL driver
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `multer` - File uploads
- `dotenv` - Environment variables
- `cors` - CORS middleware

## 🗄️ Database Management

### PostgreSQL Setup

1. **Create Database:**

   ```bash
   psql -U postgres
   CREATE DATABASE "creative-school";
   ```

2. **View Tables:**

   ```bash
   psql -U postgres -d creative-school -c "\dt"
   ```

3. **Backup Database:**

   ```bash
   pg_dump -U postgres creative-school > backup.sql
   ```

4. **Restore Database:**
   ```bash
   psql -U postgres creative-school < backup.sql
   ```

### SQLite to PostgreSQL Migration

If migrating from SQLite (`school.db`):

```bash
npm run migrate
```

This will:

- Read all data from `school.db`
- Create PostgreSQL tables
- Migrate all records automatically

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed instructions.

## 📝 NPM Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with auto-reload
npm run migrate # Migrate data from SQLite to PostgreSQL
npm test        # Run tests (if configured)
```

## 🔗 Related Files

- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Detailed migration from SQLite to PostgreSQL
- [schema.sql](./schema.sql) - PostgreSQL schema definition
- [.env.example](./.env.example) - Environment variables template
