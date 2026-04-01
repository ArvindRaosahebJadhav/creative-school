import { Gallery } from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const { category, type } = req.query;
    const where = {};

    if (category) where.category = category;
    if (type) where.type = type;

    const gallery = await Gallery.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createGallery = async (req, res) => {
  try {
    const { title, type, category, videoUrl } = req.body;

    if (!title || !type || !category) {
      return res.status(400).json({
        error: 'Title, type, and category are required',
      });
    }

    if (type === 'photo' && !req.file) {
      return res.status(400).json({
        error: 'Image file is required for photo type',
      });
    }

    const url = type === 'photo' ? `/uploads/${req.file.filename}` : videoUrl;

    const gallery = await Gallery.create({
      title,
      type,
      url,
      category,
    });

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, category, videoUrl } = req.body;

    const gallery = await Gallery.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    let url = gallery.url;
    if (type === 'photo' && req.file) {
      url = `/uploads/${req.file.filename}`;
    } else if (type === 'video' && videoUrl) {
      url = videoUrl;
    }

    await gallery.update({
      title: title || gallery.title,
      type: type || gallery.type,
      url,
      category: category || gallery.category,
    });

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    await gallery.destroy();
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
