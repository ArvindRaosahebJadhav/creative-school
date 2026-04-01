import { SchoolInfo } from '../models/SchoolInfo.js';

export const getSchoolInfo = async (req, res) => {
  try {
    const info = await SchoolInfo.findAll();

    const result = {};
    info.forEach((item) => {
      result[item.key] = item.value;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInfoByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const info = await SchoolInfo.findOne({ where: { key } });
    if (!info) {
      return res.status(404).json({ error: 'Info not found' });
    }

    res.json({ [key]: info.value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const setSchoolInfo = async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key || !value) {
      return res.status(400).json({ error: 'Key and value are required' });
    }

    const [info, created] = await SchoolInfo.findOrCreate({
      where: { key },
      defaults: { value },
    });

    if (!created) {
      await info.update({ value });
    }

    res.status(201).json({ [key]: value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSchoolInfo = async (req, res) => {
  try {
    const { key } = req.params;

    const info = await SchoolInfo.findOne({ where: { key } });
    if (!info) {
      return res.status(404).json({ error: 'Info not found' });
    }

    await info.destroy();
    res.json({ message: 'Info deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
