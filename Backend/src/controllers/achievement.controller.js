import { Achievement } from '../models/Achievement.js';

export const getAchievements = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};

    if (category) where.category = category;

    const achievements = await Achievement.findAll({
      where,
      order: [['date', 'DESC']],
    });

    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id);

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: 'Title and date are required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const achievement = await Achievement.create({
      title,
      description,
      date,
      category,
      imageUrl,
    });

    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, category } = req.body;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    let imageUrl = achievement.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await achievement.update({
      title: title || achievement.title,
      description: description || achievement.description,
      date: date || achievement.date,
      category: category || achievement.category,
      imageUrl,
    });

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByPk(id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    await achievement.destroy();
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
