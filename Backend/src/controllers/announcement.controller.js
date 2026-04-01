import { Announcement } from '../models/Announcement.js';

export const getAnnouncements = async (req, res) => {
  try {
    const { isActive } = req.query;
    const where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const announcements = await Announcement.findAll({
      where,
      order: [['date', 'DESC']],
    });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, isActive } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const announcement = await Announcement.create({
      title,
      content,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isActive } = req.body;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    await announcement.update({
      title: title || announcement.title,
      content: content || announcement.content,
      isActive: isActive !== undefined ? isActive : announcement.isActive,
    });

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    await announcement.destroy();
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
