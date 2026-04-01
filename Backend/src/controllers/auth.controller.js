import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { sequelize } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'Admin@#123';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const seedAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ where: { username: 'admin' } });

    if (admin) {
      return res.status(200).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const admin = await User.findOne({ where: { username: 'admin' } });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (admin) {
      await admin.update({ password: hashedPassword });
      return res.status(200).json({ message: 'Admin password updated' });
    }

    await User.create({ username: 'admin', password: hashedPassword });
    return res.status(201).json({ message: 'Admin created with provided password' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DEV: list users (no passwords) for debugging
export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DEV: check DB connectivity and user count
export const dbStatus = async (req, res) => {
  try {
    await sequelize.authenticate();
    const count = await User.count();
    res.json({ connected: true, users: count });
  } catch (error) {
    res.status(500).json({ connected: false, error: error.message });
  }
};
